import { Helmet } from "react-helmet-async";

const Patient = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Portail Patient — Hedera Santé Afrique</title>
        <meta name="description" content="Consultez vos dossiers chiffrés et gérez vos consentements sur Hedera." />
      </Helmet>
      <main className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Portail Patient</h1>
        <p className="text-muted-foreground">Interface de consultation des dossiers et gestion des autorisations — à venir.</p>
      </main>
    </div>
  );
};

export default Patient;
