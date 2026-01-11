import { useState } from 'react';
import { useExperiences, useAddExperience, useUpdateExperience, useDeleteExperience, Experience } from '@/hooks/useExperiences';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Loader2, Building2 } from 'lucide-react';

const ExperienceEditor = () => {
  const { data: experiences, isLoading } = useExperiences();
  const addExperience = useAddExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    duration: '',
    start_year: new Date().getFullYear(),
    end_year: null as number | null,
    period_display: '',
  });

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      duration: '',
      start_year: new Date().getFullYear(),
      end_year: null,
      period_display: '',
    });
    setEditingId(null);
  };

  const handleEdit = (exp: Experience) => {
    setFormData({
      company: exp.company,
      role: exp.role,
      duration: exp.duration || '',
      start_year: exp.start_year,
      end_year: exp.end_year,
      period_display: exp.period_display || '',
    });
    setEditingId(exp.id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await updateExperience.mutateAsync({ id: editingId, ...formData });
        toast({ title: 'Experiencia actualizada' });
      } else {
        await addExperience.mutateAsync({ ...formData, sort_order: 0 });
        toast({ title: 'Experiencia añadida', description: 'Se ha ordenado automáticamente por año.' });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'No se pudo guardar.', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta experiencia?')) return;
    
    try {
      await deleteExperience.mutateAsync(id);
      toast({ title: 'Experiencia eliminada' });
    } catch (error) {
      toast({ title: 'Error', description: 'No se pudo eliminar.', variant: 'destructive' });
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-gradient-gold">
          Experiencia Laboral
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="luxury-button">
              <Plus className="w-4 h-4 mr-2" />
              Añadir
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-charcoal border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-gradient-gold">
                {editingId ? 'Editar Experiencia' : 'Nueva Experiencia'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-background border-primary/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Puesto</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="bg-background border-primary/20"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_year">Año inicio</Label>
                  <Input
                    id="start_year"
                    type="number"
                    value={formData.start_year}
                    onChange={(e) => setFormData({ ...formData, start_year: parseInt(e.target.value) })}
                    className="bg-background border-primary/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_year">Año fin (vacío = presente)</Label>
                  <Input
                    id="end_year"
                    type="number"
                    value={formData.end_year || ''}
                    onChange={(e) => setFormData({ ...formData, end_year: e.target.value ? parseInt(e.target.value) : null })}
                    className="bg-background border-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duración (ej: "3 años")</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="bg-background border-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period_display">Período (ej: "2022 - Presente")</Label>
                <Input
                  id="period_display"
                  value={formData.period_display}
                  onChange={(e) => setFormData({ ...formData, period_display: e.target.value })}
                  className="bg-background border-primary/20"
                />
              </div>
              <Button type="submit" className="w-full luxury-button" disabled={addExperience.isPending || updateExperience.isPending}>
                {(addExperience.isPending || updateExperience.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingId ? 'Actualizar' : 'Añadir'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <p className="text-sm text-muted-foreground">
        Las experiencias se ordenan automáticamente por año de inicio (más reciente primero).
      </p>

      <div className="space-y-4">
        {experiences?.map((exp) => (
          <div key={exp.id} className="luxury-card flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{exp.company}</h3>
                <p className="text-primary text-sm">{exp.role}</p>
                <p className="text-muted-foreground text-xs">{exp.period_display || `${exp.start_year} - ${exp.end_year || 'Presente'}`}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(exp)} className="hover:bg-primary/10">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id)} className="hover:bg-destructive/10 text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceEditor;
