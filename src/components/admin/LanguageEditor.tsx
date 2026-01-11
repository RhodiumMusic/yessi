import { useState } from 'react';
import { useLanguages, useAddLanguage, useUpdateLanguage, useDeleteLanguage, Language } from '@/hooks/useLanguages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Loader2, Globe } from 'lucide-react';

const LanguageEditor = () => {
  const { data: languages, isLoading } = useLanguages();
  const addLanguage = useAddLanguage();
  const updateLanguage = useUpdateLanguage();
  const deleteLanguage = useDeleteLanguage();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    proficiency_percent: 100,
    sort_order: 0,
  });

  const resetForm = () => {
    setFormData({ name: '', level: '', proficiency_percent: 100, sort_order: 0 });
    setEditingId(null);
  };

  const handleEdit = (lang: Language) => {
    setFormData({
      name: lang.name,
      level: lang.level,
      proficiency_percent: lang.proficiency_percent || 100,
      sort_order: lang.sort_order || 0,
    });
    setEditingId(lang.id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await updateLanguage.mutateAsync({ id: editingId, ...formData });
        toast({ title: 'Idioma actualizado' });
      } else {
        await addLanguage.mutateAsync(formData);
        toast({ title: 'Idioma añadido' });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'No se pudo guardar.', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este idioma?')) return;
    
    try {
      await deleteLanguage.mutateAsync(id);
      toast({ title: 'Idioma eliminado' });
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
          Idiomas
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
                {editingId ? 'Editar Idioma' : 'Nuevo Idioma'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Idioma</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-primary/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Nivel (ej: Nativo, B2, C1)</Label>
                <Input
                  id="level"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="bg-background border-primary/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proficiency_percent">Porcentaje de dominio (0-100)</Label>
                <Input
                  id="proficiency_percent"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.proficiency_percent}
                  onChange={(e) => setFormData({ ...formData, proficiency_percent: parseInt(e.target.value) })}
                  className="bg-background border-primary/20"
                />
              </div>
              <Button type="submit" className="w-full luxury-button" disabled={addLanguage.isPending || updateLanguage.isPending}>
                {(addLanguage.isPending || updateLanguage.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingId ? 'Actualizar' : 'Añadir'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {languages?.map((lang) => (
          <div key={lang.id} className="luxury-card flex items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{lang.name}</h3>
                <p className="text-primary text-sm">{lang.level}</p>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden max-w-48">
                  <div 
                    className="h-full bg-gradient-gold" 
                    style={{ width: `${lang.proficiency_percent || 0}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(lang)} className="hover:bg-primary/10">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(lang.id)} className="hover:bg-destructive/10 text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageEditor;
