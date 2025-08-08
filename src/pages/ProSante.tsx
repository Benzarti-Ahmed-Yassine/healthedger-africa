import { Helmet } from "react-helmet-async";

const ProSante = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Portail Pro Santé — Hedera Santé Afrique</title>
        <meta name="description" content="Accédez aux dossiers autorisés et vérifiez l’historique sur Hedera." />
      </Helmet>
      <main className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Portail Professionnel de Santé</h1>
        <p className="text-muted-foreground">Accès sécurisé aux dossiers patients — en construction.</p>
      </main>
    </div>
  );
};

export default ProSante;
