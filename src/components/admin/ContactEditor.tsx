import { useState } from 'react';
import { useContactInfo, useAddContactInfo, useUpdateContactInfo, useDeleteContactInfo, ContactInfo } from '@/hooks/useContactInfo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Loader2, Phone, MapPin, Mail, Globe, MessageCircle, Linkedin } from 'lucide-react';
import { contactSchema, formatValidationErrors } from '@/lib/validation';

const iconOptions = [
  { value: 'Phone', label: 'Teléfono', icon: Phone },
  { value: 'MapPin', label: 'Ubicación', icon: MapPin },
  { value: 'Mail', label: 'Email', icon: Mail },
  { value: 'Globe', label: 'Web', icon: Globe },
  { value: 'MessageCircle', label: 'WhatsApp', icon: MessageCircle },
  { value: 'Linkedin', label: 'LinkedIn', icon: Linkedin },
];

const typeOptions = [
  { value: 'phone', label: 'Teléfono' },
  { value: 'location', label: 'Ubicación' },
  { value: 'email', label: 'Email' },
  { value: 'website', label: 'Sitio web' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'linkedin', label: 'LinkedIn' },
];

const getIconComponent = (iconName: string | null) => {
  const found = iconOptions.find(opt => opt.value === iconName);
  return found ? found.icon : Phone;
};

const ContactEditor = () => {
  const { data: contacts, isLoading } = useContactInfo();
  const addContact = useAddContactInfo();
  const updateContact = useUpdateContactInfo();
  const deleteContact = useDeleteContactInfo();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: 'phone',
    value: '',
    label: '',
    icon_name: 'Phone',
    sort_order: 0,
  });

  const resetForm = () => {
    setFormData({ type: 'phone', value: '', label: '', icon_name: 'Phone', sort_order: 0 });
    setEditingId(null);
  };

  const handleEdit = (contact: ContactInfo) => {
    setFormData({
      type: contact.type,
      value: contact.value,
      label: contact.label || '',
      icon_name: contact.icon_name || 'Phone',
      sort_order: contact.sort_order || 0,
    });
    setEditingId(contact.id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validationResult = contactSchema.safeParse(formData);
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
        await updateContact.mutateAsync({ id: editingId, ...formData });
        toast({ title: 'Contacto actualizado' });
      } else {
        await addContact.mutateAsync(formData);
        toast({ title: 'Contacto añadido' });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'No se pudo guardar.', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este contacto?')) return;
    
    try {
      await deleteContact.mutateAsync(id);
      toast({ title: 'Contacto eliminado' });
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
          Información de Contacto
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
                {editingId ? 'Editar Contacto' : 'Nuevo Contacto'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-background border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Valor</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="Ej: +34 697 427 298"
                  className="bg-background border-primary/20"
                  required
                  maxLength={255}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="label">Etiqueta</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="Ej: Teléfono, Mi Ubicación"
                  className="bg-background border-primary/20"
                  maxLength={100}
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
              <Button type="submit" className="w-full luxury-button" disabled={addContact.isPending || updateContact.isPending}>
                {(addContact.isPending || updateContact.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingId ? 'Actualizar' : 'Añadir'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {contacts?.map((contact) => {
          const IconComponent = getIconComponent(contact.icon_name);
          return (
            <div key={contact.id} className="luxury-card flex items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{contact.label || contact.type}</h3>
                  <p className="text-muted-foreground text-sm">{contact.value}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(contact)} className="hover:bg-primary/10">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(contact.id)} className="hover:bg-destructive/10 text-destructive">
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

export default ContactEditor;
