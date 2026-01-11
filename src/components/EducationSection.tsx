import { GraduationCap, Globe } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const EducationSection = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Education */}
          <ScrollReveal direction="left">
            <div>
              <div className="mb-8">
                <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
                  Formación Académica
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
                  <span className="text-gradient-gold">Estudios</span>{" "}
                  <span className="text-foreground">Realizados</span>
                </h2>
                <div className="luxury-divider" />
              </div>

              <div className="luxury-card group hover:border-primary/50 transition-all duration-500 hover:shadow-gold">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                      Bachillerato Completo
                    </h3>
                    <p className="text-muted-foreground">
                      Educación secundaria completa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Languages */}
          <ScrollReveal direction="right" delay={150}>
            <div>
              <div className="mb-8">
                <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
                  Competencias Lingüísticas
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
                  <span className="text-gradient-gold">Idiomas</span>
                </h2>
                <div className="luxury-divider" />
              </div>

              <div className="luxury-card group hover:border-primary/50 transition-all duration-500 hover:shadow-gold">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                      Castellano
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-sm tracking-wider">
                        NATIVO
                      </span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-gold w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
