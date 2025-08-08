import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";

const Patient = () => {
  const [consents, setConsents] = React.useState({
    hospital: true,
    research: false,
    alerts: true,
  });

  const onToggle = (key: keyof typeof consents, val: boolean) => {
    setConsents((c) => ({ ...c, [key]: val }));
    toast("Consentement mis à jour", { description: `${key} → ${val ? "autorisé" : "révoqué"}` });
  };

  const [profile, setProfile] = React.useState<any>(null);
  const [physio, setPhysio] = React.useState<any[]>([]);

  React.useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: prof } = await supabase.from("profiles").select("*").eq("user_id", session.user.id).maybeSingle();
      setProfile(prof);
      if (prof) {
        const { data: rows } = await supabase
          .from("physiological_data")
          .select("*")
          .eq("patient_id", prof.id)
          .order("recorded_at", { ascending: false })
          .limit(10);
        setPhysio(rows || []);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Portail Patient — Hedera Santé Afrique</title>
        <meta name="description" content="Consultez vos dossiers chiffrés et gérez vos consentements sur Hedera." />
      </Helmet>
      <main className="container mx-auto py-12 grid gap-6 md:grid-cols-2">
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Dossiers</CardTitle>
              <CardDescription>Vos documents chiffrés (démo)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Vaccinations</p>
                  <p className="text-sm text-muted-foreground">PDF chiffré • 1.2MB</p>
                </div>
                <Button variant="outline">Partager</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Analyses • 05/2024</p>
                  <p className="text-sm text-muted-foreground">Rapport labo</p>
                </div>
                <Button variant="outline">Partager</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Profil (Supabase)</CardTitle>
              <CardDescription>Vos informations de compte</CardDescription>
            </CardHeader>
            <CardContent>
              {profile ? (
                <ul className="text-sm text-muted-foreground list-disc pl-5">
                  <li>Prénom: {profile.first_name}</li>
                  <li>Nom: {profile.last_name}</li>
                  <li>Âge: {profile.age}</li>
                  <li>Rôle: {profile.role}</li>
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Chargement du profil…</p>
              )}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Consentements</CardTitle>
              <CardDescription>Contrôle granulaire des accès</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="c1">Partage avec l’hôpital</Label>
                  <p className="text-sm text-muted-foreground">Accès aux professionnels autorisés</p>
                </div>
                <Switch id="c1" checked={consents.hospital} onCheckedChange={(v)=>onToggle("hospital", v)} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="c2">Étude clinique</Label>
                  <p className="text-sm text-muted-foreground">Pseudonymisé, révocable à tout moment</p>
                </div>
                <Switch id="c2" checked={consents.research} onCheckedChange={(v)=>onToggle("research", v)} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="c3">Notifications d’alerte</Label>
                  <p className="text-sm text-muted-foreground">Alertes de sécurité et rappels</p>
                </div>
                <Switch id="c3" checked={consents.alerts} onCheckedChange={(v)=>onToggle("alerts", v)} />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Données physiologiques (Supabase)</CardTitle>
              <CardDescription>10 dernières mesures</CardDescription>
            </CardHeader>
            <CardContent>
              {physio.length ? (
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  {physio.map((r) => (
                    <li key={r.id}>{new Date(r.recorded_at).toLocaleString()} — {r.data_type}: {r.value} {r.unit}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Aucune donnée trouvée.</p>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Patient;
