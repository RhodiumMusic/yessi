import { useState } from 'react';
import { useEducation, useAddEducation, useUpdateEducation, useDeleteEducation, Education } from '@/hooks/useEducation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Loader2, GraduationCap } from 'lucide-react';

const EducationEditor = () => {
  const { data: education, isLoading } = useEducation();
  const addEducation = useAddEducation();
  const updateEducation = useUpdateEducation();
  const deleteEducation = useDeleteEducation();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    institution: '',
    year: null as number | null,
    sort_order: 0,
  });

  const resetForm = () => {
    setFormData({ title: '', description: '', institution: '', year: null, sort_order: 0 });
    setEditingId(null);
  };

  const handleEdit = (edu: Education) => {
    setFormData({
      title: edu.title,
      description: edu.description || '',
      institution: edu.institution || '',
      year: edu.year,
      sort_order: edu.sort_order || 0,
    });
    setEditingId(edu.id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await updateEducation.mutateAsync({ id: editingId, ...formData });
        toast({ title: 'Formación actualizada' });
      } else {
        await addEducation.mutateAsync(formData);
        toast({ title: 'Formación añadida' });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'No se pudo guardar.', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta formación?')) return;
    
    try {
      await deleteEducation.mutateAsync(id);
      toast({ title: 'Formación eliminada' });
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
          Formación Académica
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
                {editingId ? 'Editar Formación' : 'Nueva Formación'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-background border-primary/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-background border-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institución</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="bg-background border-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Año</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year || ''}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value ? parseInt(e.target.value) : null })}
                  className="bg-background border-primary/20"
                />
              </div>
              <Button type="submit" className="w-full luxury-button" disabled={addEducation.isPending || updateEducation.isPending}>
                {(addEducation.isPending || updateEducation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingId ? 'Actualizar' : 'Añadir'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {education?.map((edu) => (
          <div key={edu.id} className="luxury-card flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{edu.title}</h3>
                {edu.description && <p className="text-muted-foreground text-sm">{edu.description}</p>}
                {edu.institution && <p className="text-primary text-xs">{edu.institution}</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(edu)} className="hover:bg-primary/10">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(edu.id)} className="hover:bg-destructive/10 text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationEditor;
