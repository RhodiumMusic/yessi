import { useState, useEffect } from 'react';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserCircle, Save, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { formatValidationErrors } from '@/lib/validation';

const summarySchema = z.object({
  professional_summary: z.string().max(1000, 'El resumen no puede exceder 1000 caracteres').nullable(),
});

const ProfileSummaryEditor = () => {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (profile) {
      setSummary(profile.professional_summary || '');
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile?.id) return;

    const validation = summarySchema.safeParse({ professional_summary: summary || null });
    
    if (!validation.success) {
      toast({
        title: 'Error de validación',
        description: formatValidationErrors(validation.error),
        variant: 'destructive',
      });
      return;
    }

    try {
      await updateProfile.mutateAsync({
        id: profile.id,
        professional_summary: summary || null,
      });
      
      toast({
        title: 'Perfil actualizado',
        description: 'El resumen profesional se ha guardado correctamente.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo guardar el resumen profesional.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const characterCount = summary.length;
  const maxCharacters = 1000;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <UserCircle className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Perfil Profesional</h2>
          <p className="text-sm text-muted-foreground">
            Escribe un resumen de tu perfil profesional
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="summary">Resumen Profesional</Label>
          <Textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Describe tu experiencia, habilidades y lo que te hace destacar como profesional..."
            className="min-h-[200px] resize-none bg-charcoal/50 border-primary/20 focus:border-primary"
            maxLength={maxCharacters}
          />
          <div className="flex justify-end">
            <span className={`text-xs ${characterCount > maxCharacters * 0.9 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {characterCount}/{maxCharacters} caracteres
            </span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={updateProfile.isPending}
          className="w-full sm:w-auto"
        >
          {updateProfile.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ProfileSummaryEditor;
