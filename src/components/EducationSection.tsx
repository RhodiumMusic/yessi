import { GraduationCap, Globe, Loader2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useEducation } from "@/hooks/useEducation";
import { useLanguages } from "@/hooks/useLanguages";

const EducationSection = () => {
  const { data: education, isLoading: educationLoading } = useEducation();
  const { data: languages, isLoading: languagesLoading } = useLanguages();

  const isLoading = educationLoading || languagesLoading;

  if (isLoading) {
    return (
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 flex justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </section>
    );
  }

  const hasEducation = education && education.length > 0;
  const hasLanguages = languages && languages.length > 0;

  if (!hasEducation && !hasLanguages) {
    return null;
  }

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Education */}
          {hasEducation && (
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

                <div className="space-y-4">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="luxury-card group hover:border-primary/50 transition-all duration-500 hover:shadow-gold"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold group-hover:scale-110 transition-transform duration-300">
                          <GraduationCap className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                            {edu.title}
                          </h3>
                          {edu.description && (
                            <p className="text-muted-foreground">
                              {edu.description}
                            </p>
                          )}
                          {edu.institution && (
                            <p className="text-primary text-sm mt-1">
                              {edu.institution}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Languages */}
          {hasLanguages && (
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

                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div
                      key={lang.id}
                      className="luxury-card group hover:border-primary/50 transition-all duration-500 hover:shadow-gold"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold group-hover:scale-110 transition-transform duration-300">
                          <Globe className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                            {lang.name}
                          </h3>
                          <div className="flex items-center gap-4">
                            <span className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-sm tracking-wider">
                              {lang.level.toUpperCase()}
                            </span>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-gold"
                                style={{
                                  width: `${lang.proficiency_percent ?? 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
