import { useProfile } from "@/hooks/useProfile";
import { UserCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ProfileSummarySection = () => {
  const { data: profile, isLoading } = useProfile();

  if (isLoading || !profile?.professional_summary) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-gold">
                <UserCircle className="w-6 h-6 text-charcoal-900" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-gold">
                Perfil Profesional
              </h2>
            </div>
          </ScrollReveal>

          {/* Decorative quote marks */}
          <ScrollReveal delay={150}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl text-gold-400/20 font-serif select-none">
                "
              </div>
              <div className="absolute -bottom-8 -right-4 text-6xl text-gold-400/20 font-serif select-none rotate-180">
                "
              </div>
              
              {/* Content card */}
              <div className="luxury-card p-8 md:p-10">
                <p className="text-cream-100/90 text-lg md:text-xl leading-relaxed font-light">
                  {profile.professional_summary}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Bottom decorative element */}
          <ScrollReveal delay={300}>
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-400/50" />
                <div className="w-2 h-2 rounded-full bg-gold-400/50" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-400/50" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProfileSummarySection;
