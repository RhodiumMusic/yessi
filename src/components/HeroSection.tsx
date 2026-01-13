import { Phone, MapPin, Calendar } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { usePublicProfile } from "@/hooks/usePublicProfile";
import { useContactInfo } from "@/hooks/useContactInfo";

const HeroSection = () => {
  const { data: profile } = usePublicProfile();
  const { data: contacts } = useContactInfo();

  // Get phone contact from database
  const phoneContact = contacts?.find(c => c.type === 'phone');
  const locationContact = contacts?.find(c => c.type === 'location');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Photo */}
          <div className="animate-fade-up">
            <div className="relative">
              {/* Gold border frame */}
              <div className="absolute -inset-4 bg-gradient-gold opacity-20 blur-xl rounded-full animate-pulse-ring" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/50 shadow-gold">
                <img
                  src={profile?.photo_url || profilePhoto}
                  alt={profile?.full_name || "Noelia Yésica Bazán Portugal"}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative corner elements */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-primary" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-primary" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-primary" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
                Curriculum Vitae
              </p>
            </div>
            
            <h1 className="animate-fade-up font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2" style={{ animationDelay: '0.2s' }}>
              <span className="text-gradient-gold">Noelia Yésica</span>
            </h1>
            <h2 className="animate-fade-up font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-foreground mb-8" style={{ animationDelay: '0.3s' }}>
              Bazán Portugal
            </h2>

            <div className="animate-fade-up luxury-divider mb-8" style={{ animationDelay: '0.4s' }} />

            {/* Info cards */}
            <div className="animate-fade-up flex flex-wrap justify-center lg:justify-start gap-6 mb-10" style={{ animationDelay: '0.5s' }}>
              {locationContact && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Localidad</p>
                    <p className="text-foreground font-medium">{locationContact.value}</p>
                  </div>
                </div>
              )}

              {phoneContact && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Teléfono</p>
                    <p className="text-foreground font-medium">{phoneContact.value}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="animate-fade-up flex flex-wrap justify-center lg:justify-start gap-4 mb-20 lg:mb-0" style={{ animationDelay: '0.6s' }}>
              {profile?.nationality && (
                <span className="px-4 py-2 border border-primary/30 text-primary text-sm tracking-wider">
                  {profile.nationality_flag} {profile.nationality}
                </span>
              )}
              {profile?.availability_status && (
                <span className="px-4 py-2 border border-primary/30 text-primary text-sm tracking-wider">
                  {profile.availability_status}
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
