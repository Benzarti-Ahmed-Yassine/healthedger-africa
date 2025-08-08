import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
