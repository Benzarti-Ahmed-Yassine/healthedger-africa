import { Helmet } from "react-helmet-async";
import { useIotStream } from "@/hooks/use-iot-stream";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import * as React from "react";

const formatTime = (t: number) => new Date(t).toLocaleTimeString();

const Logistique = () => {
  const lotId = "LOT-001";
  const { readings, latest } = useIotStream(lotId, true);

  React.useEffect(() => {
    if (!latest) return;
    const outOfRange = latest.temperature < -80 || latest.temperature > -60;
    if (outOfRange) {
      toast.warning("Alerte température", {
        description: `Lot ${latest.lotId} à ${latest.temperature}°C (${latest.location})`,
      });
    }
  }, [latest]);

  const status = latest
    ? latest.temperature >= -80 && latest.temperature <= -60
      ? "OK"
      : "ALERTE"
    : "—";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Tableau Logistique — Chaîne du froid</title>
        <meta name="description" content="Suivi en temps réel des lots et des capteurs IoT (prototype)." />
      </Helmet>

      <main className="container mx-auto py-12">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Tableau de bord logistique</h1>
          <p className="text-muted-foreground">Lot suivi: {lotId}</p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Température</CardTitle>
              <CardDescription>Plage cible: -80 à -60 °C</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {latest ? `${latest.temperature.toFixed(2)} °C` : "—"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Humidité</CardTitle>
              <CardDescription>Acceptable: 30–65%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {latest ? `${latest.humidity.toFixed(1)} %` : "—"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statut</CardTitle>
              <CardDescription>Dernière mise à jour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Badge variant={status === "OK" ? "default" : "destructive"}>{status}</Badge>
                <span className="text-sm text-muted-foreground">
                  {latest ? `${formatTime(latest.timestamp)} — ${latest.location}` : "en attente…"}
                </span>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Série temporelle</CardTitle>
              <CardDescription>Évolution des mesures (temps réel)</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={readings.map(r => ({
                  time: formatTime(r.timestamp),
                  temperature: r.temperature,
                  humidity: r.humidity,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" minTickGap={20} />
                  <YAxis yAxisId="left" domain={[-100, 0]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="hsl(var(--primary))" dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="hsl(var(--accent))" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8 flex gap-3">
          <Button onClick={() => window.location.reload()}>Redémarrer</Button>
          <Button variant="outline" onClick={() => toast("Historique exporté (démo)")}>Exporter l’historique</Button>
        </section>
      </main>
    </div>
  );
};

export default Logistique;
