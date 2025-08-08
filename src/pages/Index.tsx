import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuroraBackground from "@/components/visuals/AuroraBackground";
import heroImage from "@/assets/hero-hedera.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Hedera Santé Afrique — Données médicales sécurisées</title>
        <meta name="description" content="Plateforme Hedera: dossiers médicaux chiffrés, traçabilité pharmaceutique et consentements immuables pour l’Afrique." />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Hedera Santé Afrique",
          applicationCategory: "HealthApplication",
          description:
            "DApp Hedera pour dossiers médicaux chiffrés, traçabilité chaîne du froid et gestion des consentements.",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Comment la sécurité est-elle assurée ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Chiffrement AES-256 hors chaîne, hachages sur Hedera Consensus Service et autorisations via Hedera Token Service.",
              },
            },
            {
              "@type": "Question",
              name: "Fonctionne-t-il hors ligne ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Un mode hors ligne avec synchronisation est prévu pour les zones à faible connectivité.",
              },
            },
            {
              "@type": "Question",
              name: "Quel module sera prioritaire ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le prototype met l’accent sur la traçabilité de la chaîne du froid pour les vaccins.",
              },
            },
          ],
        })}</script>
      </Helmet>

      <header>
        <AuroraBackground>
          <section className="container mx-auto grid md:grid-cols-2 gap-10 items-center py-16">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                Plateforme Hedera Santé pour l’Afrique
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Registre médical décentralisé, traçabilité des médicaments et gestion des consentements — performant, transparent et abordable.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg">
                  <Link to="/logistique">Démarrer la démo Chaîne du froid</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#features">Voir les fonctionnalités</a>
                </Button>
              </div>
            </div>
            <figure className="rounded-xl overflow-hidden shadow-elevate">
              <img
                src={heroImage}
                alt="Illustration futuriste de santé sur blockchain Hedera"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </figure>
          </section>
        </AuroraBackground>
      </header>

      <main id="features" className="container mx-auto py-16">
        <section className="grid md:grid-cols-3 gap-6">
          <article className="p-6 rounded-xl border bg-card shadow-elevate">
            <h2 className="text-xl font-semibold mb-2">Registre médical sécurisé</h2>
            <p className="text-muted-foreground mb-4">Dossiers chiffrés (AES-256) stockés hors chaîne avec hachages sur HCS. Partage contrôlé via HTS.</p>
            <Button asChild variant="link"><Link to="/patient">Portail Patient</Link></Button>
          </article>
          <article className="p-6 rounded-xl border bg-card shadow-elevate">
            <h2 className="text-xl font-semibold mb-2">Traçabilité chaîne du froid</h2>
            <p className="text-muted-foreground mb-4">Données IoT horodatées sur HCS. Conformité vérifiable en temps réel.</p>
            <Button asChild variant="link"><Link to="/logistique">Tableau Logistique</Link></Button>
          </article>
          <article className="p-6 rounded-xl border bg-card shadow-elevate">
            <h2 className="text-xl font-semibold mb-2">Consentements immuables</h2>
            <p className="text-muted-foreground mb-4">Accorder, modifier, révoquer. Historique auditable et conforme RGPD.</p>
            <Button asChild variant="link"><Link to="/pro-sante">Portail Pro Santé</Link></Button>
          </article>
        </section>

        <section id="demo" className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-2">Prototype Hackathon 2025</h2>
          <p className="text-muted-foreground mb-6">Nous préparons une démo axée sur la traçabilité des vaccins. Rejoignez-nous pour tester !</p>
          <Button asChild variant="hero" size="lg"><Link to="/logistique">Essayer maintenant</Link></Button>
        </section>
      </main>
    </div>
  );
};

export default Index;
