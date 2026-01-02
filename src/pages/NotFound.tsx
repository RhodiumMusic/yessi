import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-display font-bold text-gradient-gold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Página no encontrada</p>
        <a href="/" className="luxury-button">
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
