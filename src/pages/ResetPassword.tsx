import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, ArrowLeft, Check, X } from 'lucide-react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updatePassword, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Password validation
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const isValidPassword = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && passwordsMatch;

  useEffect(() => {
    // If no user is logged in after loading, redirect to login
    if (!authLoading && !user) {
      toast({
        title: 'Sesión expirada',
        description: 'El enlace de recuperación ha expirado. Solicita uno nuevo.',
        variant: 'destructive',
      });
      navigate('/admin');
    }
  }, [user, authLoading, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidPassword) {
      toast({
        title: 'Contraseña inválida',
        description: 'Asegúrate de cumplir todos los requisitos de seguridad.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const { error } = await updatePassword(newPassword);
    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar la contraseña. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Contraseña actualizada',
        description: 'Tu contraseña ha sido cambiada exitosamente.',
      });
      navigate('/admin/dashboard');
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

  const ValidationItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-sm ${isValid ? 'text-green-500' : 'text-muted-foreground'}`}>
      {isValid ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio de sesión</span>
        </button>

        {/* Reset password card */}
        <div className="luxury-card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4 shadow-gold">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-gradient-gold mb-2">
              Nueva Contraseña
            </h1>
            <p className="text-muted-foreground">
              Introduce tu nueva contraseña
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-charcoal border-primary/20 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-charcoal border-primary/20 focus:border-primary"
                  required
                />
              </div>
            </div>

            {/* Password requirements */}
            <div className="bg-charcoal/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-foreground mb-2">Requisitos de seguridad:</p>
              <ValidationItem isValid={hasMinLength} text="Mínimo 8 caracteres" />
              <ValidationItem isValid={hasUpperCase} text="Al menos una mayúscula" />
              <ValidationItem isValid={hasLowerCase} text="Al menos una minúscula" />
              <ValidationItem isValid={hasNumber} text="Al menos un número" />
              <ValidationItem isValid={passwordsMatch} text="Las contraseñas coinciden" />
            </div>

            <Button
              type="submit"
              className="w-full luxury-button"
              disabled={isLoading || !isValidPassword}
            >
              {isLoading ? 'Actualizando...' : 'Actualizar contraseña'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
