import { useState } from 'react';
import { useSkills, useAddSkill, useUpdateSkill, useDeleteSkill, Skill } from '@/hooks/useSkills';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Loader2, Star, Clock, Users, CheckCircle, Zap, Sparkles, Heart, Award, Target, Shield } from 'lucide-react';
import { skillSchema, formatValidationErrors } from '@/lib/validation';

const iconOptions = [
  { value: 'Star', label: 'Estrella', icon: Star },
  { value: 'Clock', label: 'Reloj', icon: Clock },
  { value: 'Users', label: 'Equipo', icon: Users },
  { value: 'CheckCircle', label: 'Check', icon: CheckCircle },
  { value: 'Zap', label: 'Rayo', icon: Zap },
  { value: 'Sparkles', label: 'Brillos', icon: Sparkles },
  { value: 'Heart', label: 'Corazón', icon: Heart },
  { value: 'Award', label: 'Premio', icon: Award },
  { value: 'Target', label: 'Objetivo', icon: Target },
  { value: 'Shield', label: 'Escudo', icon: Shield },
];

const getIconComponent = (iconName: string | null) => {
  const found = iconOptions.find(opt => opt.value === iconName);
  return found ? found.icon : Star;
};

const SkillsEditor = () => {
  const { data: skills, isLoading } = useSkills();
  const addSkill = useAddSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_name: 'Star',
    sort_order: 0,
  });

  const resetForm = () => {
    setFormData({ title: '', description: '', icon_name: 'Star', sort_order: 0 });
    setEditingId(null);
  };

  const handleEdit = (skill: Skill) => {
    setFormData({
      title: skill.title,
      description: skill.description || '',
      icon_name: skill.icon_name || 'Star',
      sort_order: skill.sort_order || 0,
    });
    setEditingId(skill.id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validationResult = skillSchema.safeParse(formData);
    if (!validationResult.success) {
      toast({ 
        title: 'Error de validación', 
        description: formatValidationErrors(validationResult.error), 
        variant: 'destructive' 
      });
      return;
    }
    
    try {
      if (editingId) {
        await updateSkill.mutateAsync({ id: editingId, ...formData });
        toast({ title: 'Cualidad actualizada' });
      } else {
        await addSkill.mutateAsync(formData);
        toast({ title: 'Cualidad añadida' });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'No se pudo guardar.', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta cualidad?')) return;
    
    try {
      await deleteSkill.mutateAsync(id);
      toast({ title: 'Cualidad eliminada' });
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
          Cualidades Personales
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
                {editingId ? 'Editar Cualidad' : 'Nueva Cualidad'}
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
                  maxLength={255}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-background border-primary/20"
                  maxLength={500}
                />
              </div>
              <div className="space-y-2">
                <Label>Icono</Label>
                <Select value={formData.icon_name} onValueChange={(value) => setFormData({ ...formData, icon_name: value })}>
                  <SelectTrigger className="bg-background border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <div className="flex items-center gap-2">
                          <opt.icon className="w-4 h-4" />
                          <span>{opt.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full luxury-button" disabled={addSkill.isPending || updateSkill.isPending}>
                {(addSkill.isPending || updateSkill.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingId ? 'Actualizar' : 'Añadir'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {skills?.map((skill) => {
          const IconComponent = getIconComponent(skill.icon_name);
          return (
            <div key={skill.id} className="luxury-card flex items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{skill.title}</h3>
                  {skill.description && <p className="text-muted-foreground text-sm">{skill.description}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(skill)} className="hover:bg-primary/10">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(skill.id)} className="hover:bg-destructive/10 text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsEditor;
