import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <main className="text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-6">Oops! Page introuvable</p>
        <Button asChild variant="link">
          <Link to="/">Retour à l’accueil</Link>
        </Button>
      </main>
    </div>
  );
};

export default NotFound;
