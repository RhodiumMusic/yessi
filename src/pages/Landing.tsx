import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePublicProfile } from "@/hooks/usePublicProfile";
import profilePhoto from "@/assets/profile-photo.jpg";

const Landing = () => {
  const navigate = useNavigate();
  const { data: profile } = usePublicProfile();

  const displayName = profile?.full_name || "Noelia Yésica Bazán Portugal";
  const profession = profile?.profession || "Profesional Comprometida";

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Golden particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold-400 rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
        
        {/* Decorative golden lines */}
        <div className="absolute top-20 left-10 w-32 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
        <div className="absolute top-32 right-20 w-48 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute bottom-48 left-20 w-40 h-px bg-gradient-to-r from-transparent via-gold-400/25 to-transparent hidden md:block" />
        <div className="absolute bottom-40 right-10 w-24 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent hidden md:block" />
        
        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-gold-400/20" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-gold-400/20" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-gold-400/20 hidden md:block" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-gold-400/20 hidden md:block" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Sparkle icon */}
        <div className="animate-fade-up mb-8">
          <Sparkles className="w-8 h-8 text-gold-400 animate-pulse" />
        </div>

        {/* Profile photo */}
        <div className="animate-fade-up animation-delay-100 relative mb-10">
          {/* Outer glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-gold-400/20 via-gold-300/30 to-gold-400/20 rounded-full blur-xl animate-pulse" />
          
          {/* Golden frame */}
          <div className="relative w-48 h-48 rounded-full p-1 bg-gradient-gold shadow-gold">
            <div className="w-full h-full rounded-full p-1 bg-charcoal-900">
              <img
                src={profile?.photo_url || profilePhoto}
                alt={displayName}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          
          {/* Decorative ring */}
          <div className="absolute -inset-6 border border-gold-400/20 rounded-full" />
        </div>

        {/* Name */}
        <h1 className="animate-fade-up animation-delay-200 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-4 leading-tight">
          <span className="block">Noelia Yésica</span>
          <span className="block">Bazán Portugal</span>
        </h1>

        {/* Decorative divider */}
        <div className="animate-fade-up animation-delay-300 flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-400/50" />
          <div className="w-2 h-2 bg-gold-400 rotate-45" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-400/50" />
        </div>

        {/* Tagline */}
        <p className="animate-fade-up animation-delay-400 text-xl md:text-2xl text-cream-100/80 font-light mb-12">
          {profession}
        </p>

        {/* CTA Button */}
        <div className="animate-fade-up animation-delay-500">
          <Button
            onClick={() => navigate("/cv")}
            size="lg"
            className="group luxury-button text-lg px-8 py-6 rounded-full shadow-gold hover:shadow-elegant transition-all duration-500"
          >
            Ver mi Curriculum Vitae
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Subtle hint */}
        <p className="animate-fade-up animation-delay-600 mt-8 text-sm text-muted-foreground/60">
          Haz clic para conocer mi trayectoria profesional
        </p>

        {/* Developer credit */}
        <p className="animate-fade-up animation-delay-700 mt-12 text-sm text-muted-foreground/60">
          Desarrollado por:{" "}
          <a
            href="https://tech.rhodiummusic.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-muted-foreground/80 hover:text-primary transition-colors"
          >
            Rhodium Music Tech
          </a>
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
    </div>
  );
};

export default Landing;
