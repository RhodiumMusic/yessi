import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { signIn, signUp, resetPassword, user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignUp) {
      const { error } = await signUp(email, password);
      if (error) {
        toast({
          title: 'Error al crear cuenta',
          description: error.message || 'No se pudo crear la cuenta.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Cuenta creada',
          description: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
        });
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: 'Error de acceso',
          description: 'Credenciales incorrectas o no tienes permisos de administrador.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Bienvenido/a',
          description: 'Acceso concedido al panel de administración.',
        });
      }
    }

    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await resetPassword(email);
    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudo enviar el correo de recuperación. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Correo enviado',
        description: 'Si el correo existe, recibirás un enlace para restablecer tu contraseña.',
      });
      setIsForgotPassword(false);
      setEmail('');
    }

    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => {
            if (isForgotPassword) {
              setIsForgotPassword(false);
            } else {
              navigate('/');
            }
          }}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isForgotPassword ? 'Volver al inicio de sesión' : 'Volver al CV'}</span>
        </button>

        {/* Login card */}
        <div className="luxury-card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4 shadow-gold">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-gradient-gold mb-2">
              {isForgotPassword ? 'Recuperar Contraseña' : isSignUp ? 'Crear Cuenta' : 'Panel Admin'}
            </h1>
            <p className="text-muted-foreground">
              {isForgotPassword 
                ? 'Introduce tu correo para recibir un enlace de recuperación' 
                : isSignUp 
                  ? 'Regístrate para administrar tu CV' 
                  : 'Accede para gestionar tu CV'}
            </p>
          </div>

          {isForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="pl-10 bg-charcoal border-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full luxury-button"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@ejemplo.com"
                    className="pl-10 bg-charcoal border-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-charcoal border-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full luxury-button"
                disabled={isLoading}
              >
                {isLoading ? (isSignUp ? 'Creando cuenta...' : 'Accediendo...') : (isSignUp ? 'Crear Cuenta' : 'Acceder al Panel')}
              </Button>
            </form>
          )}

          {!isForgotPassword && (
            <div className="mt-6 space-y-3 text-center">
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-sm text-primary hover:text-primary/80 transition-colors block w-full"
              >
                ¿Olvidaste tu contraseña?
              </button>
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors block w-full"
              >
                {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Créala aquí'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
