import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, User, UserCircle, Briefcase, GraduationCap, Globe, Sparkles, Phone, ArrowLeft } from 'lucide-react';
import ProfileEditor from '@/components/admin/ProfileEditor';
import ProfileSummaryEditor from '@/components/admin/ProfileSummaryEditor';
import ExperienceEditor from '@/components/admin/ExperienceEditor';
import EducationEditor from '@/components/admin/EducationEditor';
import LanguageEditor from '@/components/admin/LanguageEditor';
import SkillsEditor from '@/components/admin/SkillsEditor';
import ContactEditor from '@/components/admin/ContactEditor';

const AdminDashboard = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/admin');
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-charcoal border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Ver CV</span>
              </button>
              <div className="h-6 w-px bg-primary/20" />
              <h1 className="font-display text-xl font-bold text-gradient-gold">
                Panel de Administración
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="border-primary/20 hover:border-primary hover:bg-primary/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-2 bg-charcoal/50 p-2 h-auto">
            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <UserCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Experiencia</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Formación</span>
            </TabsTrigger>
            <TabsTrigger value="languages" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Idiomas</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Cualidades</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Contacto</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <ProfileEditor />
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <ProfileSummaryEditor />
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <ExperienceEditor />
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <EducationEditor />
          </TabsContent>

          <TabsContent value="languages" className="space-y-6">
            <LanguageEditor />
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <SkillsEditor />
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <ContactEditor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
