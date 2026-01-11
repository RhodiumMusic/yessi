import { useState, useEffect } from 'react';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Upload, Loader2 } from 'lucide-react';
import { profileSchema, validateImageFile, formatValidationErrors } from '@/lib/validation';

const ProfileEditor = () => {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: '',
    location: '',
    phone: '',
    nationality: '',
    nationality_flag: '',
    profession: '',
    availability_status: '',
    photo_url: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        birth_date: profile.birth_date || '',
        location: profile.location || '',
        phone: profile.phone || '',
        nationality: profile.nationality || '',
        nationality_flag: profile.nationality_flag || '',
        profession: profile.profession || '',
        availability_status: profile.availability_status || '',
        photo_url: profile.photo_url || '',
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    // Validate file type and size
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast({
        title: 'Error',
        description: validation.error,
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    // Use crypto.randomUUID for better filename security
    const fileName = `profile-${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-photos')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      toast({
        title: 'Error',
        description: 'No se pudo subir la imagen.',
        variant: 'destructive',
      });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(fileName);

    setFormData({ ...formData, photo_url: publicUrl });
    setUploading(false);
    toast({
      title: 'Imagen subida',
      description: 'La foto se ha subido correctamente. Guarda los cambios para aplicar.',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    // Validate form data
    const validationResult = profileSchema.safeParse(formData);
    if (!validationResult.success) {
      toast({ 
        title: 'Error de validación', 
        description: formatValidationErrors(validationResult.error), 
        variant: 'destructive' 
      });
      return;
    }

    try {
      await updateProfile.mutateAsync({ id: profile.id, ...formData });
      toast({
        title: 'Perfil actualizado',
        description: 'Los cambios se han guardado correctamente.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron guardar los cambios.',
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

  return (
    <div className="luxury-card max-w-2xl">
      <h2 className="font-display text-2xl font-bold text-gradient-gold mb-6">
        Editar Perfil
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo upload */}
        <div className="space-y-2">
          <Label>Foto de perfil</Label>
          <div className="flex items-center gap-4">
            {formData.photo_url && (
              <img
                src={formData.photo_url}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
              />
            )}
            <label className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 bg-charcoal border border-primary/20 rounded-lg hover:border-primary transition-colors">
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                <span>{uploading ? 'Subiendo...' : 'Cambiar foto'}</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Nombre completo</Label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="bg-charcoal border-primary/20"
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birth_date">Fecha de nacimiento</Label>
            <Input
              id="birth_date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              placeholder="DD/MM/AAAA"
              className="bg-charcoal border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="bg-charcoal border-primary/20"
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-charcoal border-primary/20"
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality">Nacionalidad</Label>
            <Input
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="bg-charcoal border-primary/20"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality_flag">Bandera (emoji)</Label>
            <Input
              id="nationality_flag"
              name="nationality_flag"
              value={formData.nationality_flag}
              onChange={handleChange}
              placeholder="🇦🇷"
              className="bg-charcoal border-primary/20"
              maxLength={10}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profession">Profesión</Label>
            <Input
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="bg-charcoal border-primary/20"
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability_status">Estado de disponibilidad</Label>
            <Input
              id="availability_status"
              name="availability_status"
              value={formData.availability_status}
              onChange={handleChange}
              className="bg-charcoal border-primary/20"
              maxLength={100}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="luxury-button"
          disabled={updateProfile.isPending}
        >
          {updateProfile.isPending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
};

export default ProfileEditor;
