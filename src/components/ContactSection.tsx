import { Phone, MapPin, MessageCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ContactSection = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
              Información de Contacto
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              <span className="text-gradient-gold">Contáctame</span>
            </h2>
            <div className="luxury-divider max-w-md mx-auto" />
          </div>
        </ScrollReveal>

        {/* Contact cards */}
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          <ScrollReveal delay={100} direction="left">
            <div className="luxury-card group hover:border-primary/50 transition-all duration-500 hover:shadow-gold hover:-translate-y-2 flex-1 min-w-[280px] max-w-sm">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-10 h-10 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Teléfono
                  </h3>
                  <p className="text-primary text-2xl font-medium">+34 697 427 298</p>
                </div>
                <div className="flex gap-3 mt-2">
                  <a
                    href="tel:+34697427298"
                    className="px-4 py-2 bg-gradient-gold text-primary-foreground rounded-full font-medium text-sm flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <Phone className="w-4 h-4" />
                    Llamar
                  </a>
                  <a
                    href="https://wa.me/34697427298"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366] text-white rounded-full font-medium text-sm flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} direction="right">
            <div className="luxury-card group hover:border-primary/50 transition-all duration-500 hover:shadow-gold hover:-translate-y-2 flex-1 min-w-[280px] max-w-sm">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-10 h-10 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Ubicación
                  </h3>
                  <p className="text-primary text-2xl font-medium">Benidorm</p>
                  <p className="text-muted-foreground">Alicante, España</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal delay={300} direction="up">
          <div className="text-center mt-16">
            <div className="inline-block luxury-card p-8 md:p-12">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                ¿Lista para trabajar?
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Con más de 12 años de experiencia en hostelería y disponibilidad inmediata,
                estoy preparada para incorporarme a su equipo.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
