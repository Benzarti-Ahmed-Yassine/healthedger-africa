import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as React from "react";

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
        </section>
      </main>
    </div>
  );
};

export default Patient;
