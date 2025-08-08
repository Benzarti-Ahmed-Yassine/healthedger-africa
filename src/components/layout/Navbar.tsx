import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState } from "@/utils/auth";

const Navbar = () => {
  const [isAuthed, setIsAuthed] = React.useState(false);

  React.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setIsAuthed(!!session));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      cleanupAuthState();
      try { await supabase.auth.signOut({ scope: 'global' }); } catch {}
    } finally {
      window.location.href = '/auth';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight">
          Hedera Santé
        </Link>
        <div className="flex items-center gap-2">
          <NavLink to="/patient" className={({isActive})=> isActive? "text-primary" : "text-foreground/80 hover:text-foreground"}>Patient</NavLink>
          <NavLink to="/pro-sante" className={({isActive})=> isActive? "text-primary" : "text-foreground/80 hover:text-foreground"}>Pro Santé</NavLink>
          <NavLink to="/logistique" className={({isActive})=> isActive? "text-primary" : "text-foreground/80 hover:text-foreground"}>Logistique</NavLink>
          <Button asChild size="sm" variant="hero">
            <a href="#demo">Essayer le prototype</a>
          </Button>
          {isAuthed ? (
            <Button size="sm" variant="outline" onClick={handleLogout}>Se déconnecter</Button>
          ) : (
            <NavLink to="/auth" className={({isActive})=> isActive? "text-primary" : "text-foreground/80 hover:text-foreground"}>Se connecter</NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
