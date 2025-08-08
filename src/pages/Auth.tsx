import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = React.useState<"login" | "signup">("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState<"patient" | "doctor" | "admin">("patient");
  const [loading, setLoading] = React.useState(false);

  const redirectUrl = `${window.location.origin}/`;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Clean up and ensure single session
      try {
        await supabase.auth.signOut({ scope: "global" });
      } catch {}
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Connexion réussie");
      window.location.href = "/";
    } catch (err: any) {
      toast.error("Échec de la connexion", { description: err?.message || "Vérifiez vos identifiants." });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validation des champs requis
      if (!firstName.trim() || !lastName.trim() || !age.trim()) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }
      
      const ageNumber = parseInt(age);
      if (isNaN(ageNumber) || ageNumber <= 0 || ageNumber >= 150) {
        throw new Error("Veuillez entrer un âge valide (1-149)");
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl },
      });
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            age: ageNumber,
            phone: phone.trim() || null,
            role: role
          }
      if (error) throw error;
      toast.success("Inscription réussie", { description: "Vérifiez votre email pour confirmer." });
    } catch (err: any) {
      toast.error("Échec de l’inscription", { description: err?.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Connexion — Hedera Santé Afrique</title>
        <meta name="description" content="Connectez-vous ou créez un compte pour accéder à vos données sécurisées." />
        <link rel="canonical" href={`${window.location.origin}/auth`} />
      </Helmet>
      <main className="container mx-auto py-12 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>{mode === "login" ? "Se connecter" : "Créer un compte"}</CardTitle>
            <CardDescription>
              {mode === "login" ? "Accédez à votre espace sécurisé" : "Rejoignez la plateforme Hedera Santé"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm" htmlFor="email">Email</label>
                <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm" htmlFor="password">Mot de passe</label>
                <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>
              
              {mode === "signup" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="firstName">Prénom *</label>
                    <Input id="firstName" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="lastName">Nom *</label>
                    <Input id="lastName" type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="age">Âge *</label>
                    <Input id="age" type="number" min="1" max="149" value={age} onChange={(e)=>setAge(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="phone">Téléphone</label>
                    <Input id="phone" type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="role">Rôle *</label>
                    <Select value={role} onValueChange={(value: "patient" | "doctor" | "admin") => setRole(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patient">Patient</SelectItem>
                        <SelectItem value="doctor">Docteur</SelectItem>
                        <SelectItem value="admin">Administrateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? "Veuillez patienter…" : (mode === "login" ? "Se connecter" : "Créer un compte")}
              </Button>
            </form>
            <div className="mt-4 text-sm text-muted-foreground">
              {mode === "login" ? (
                <>
                  Pas de compte ?
                  {" "}
                  <button className="underline" onClick={()=>setMode("signup")}>S’inscrire</button>
                </>
              ) : (
                <>
                  Déjà un compte ?
                  {" "}
                  <button className="underline" onClick={()=>setMode("login")}>Se connecter</button>
                </>
              )}
            </div>
            <div className="mt-6 text-xs text-muted-foreground">
              <p>
                Astuce: si vous testez, désactivez la confirmation d’email dans Supabase &gt; Auth &gt; Email pour accélérer.
              </p>
              <p className="mt-2">Retour à l’accueil: <Link className="underline" to="/">Accueil</Link></p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Auth;
