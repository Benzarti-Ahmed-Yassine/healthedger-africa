import { Helmet } from "react-helmet-async";
import { useIotStream } from "@/hooks/use-iot-stream";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as React from "react";

const ProSante = () => {
  const [lot, setLot] = React.useState("LOT-001");
  const { latest } = useIotStream(lot, true);

  const compliant = latest && latest.temperature >= -80 && latest.temperature <= -60;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Portail Pro Santé — Hedera Santé Afrique</title>
        <meta name="description" content="Accédez aux dossiers autorisés et vérifiez l’historique sur Hedera." />
      </Helmet>
      <main className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Portail Professionnel de Santé</h1>
        <section className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Vérifier un lot</CardTitle>
              <CardDescription>Chaîne du froid du lot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input value={lot} onChange={(e)=>setLot(e.target.value.toUpperCase())} placeholder="Ex: LOT-001" />
                <Button onClick={()=>setLot(lot)}>Vérifier</Button>
              </div>
              <div className="text-sm text-muted-foreground">Dernière mesure: {latest ? `${latest.temperature.toFixed(2)}°C — ${latest.location}` : "—"}</div>
              <div className="font-medium">Statut: {latest ? (compliant ? "Conforme" : "Non conforme") : "—"}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accès dossiers (démo)</CardTitle>
              <CardDescription>Afficher les dossiers autorisés</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                <li>Patient A — Vaccinations (autorisé)</li>
                <li>Patient B — Analyses (en attente)</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default ProSante;
