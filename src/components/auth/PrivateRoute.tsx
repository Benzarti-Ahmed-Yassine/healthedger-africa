import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState(true);
  const [isAuthed, setIsAuthed] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthed(!!session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;
  if (!isAuthed) return <Navigate to="/auth" state={{ from: location }} replace />;
  return <>{children}</>;
};

export default PrivateRoute;
