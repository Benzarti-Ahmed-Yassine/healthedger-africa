import { Helmet } from "react-helmet-async";

const Logistique = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Tableau Logistique — Chaîne du froid</title>
        <meta name="description" content="Suivi en temps réel des lots et des capteurs IoT (prototype)." />
      </Helmet>
      <main className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Tableau de bord logistique</h1>
        <p className="text-muted-foreground">Visualisation des capteurs et vérification des lots — prototype à venir.</p>
      </main>
    </div>
  );
};

export default Logistique;
