/**
 * PDF Data Sanitizer
 * Cleans and formats data from Supabase for professional PDF output
 */

// Spanish month name to number mapping for chronological sorting
const SPANISH_MONTHS: Record<string, number> = {
  enero: 1,
  febrero: 2,
  marzo: 3,
  abril: 4,
  mayo: 5,
  junio: 6,
  julio: 7,
  agosto: 8,
  septiembre: 9,
  octubre: 10,
  noviembre: 11,
  diciembre: 12,
};

/**
 * Extract month number from a period string like "Septiembre 2024 - Diciembre 2024"
 * Returns the START month number (1-12) or 0 if not found
 */
const extractStartMonth = (periodDisplay: string | null | undefined): number => {
  if (!periodDisplay) return 0;
  
  const lowerPeriod = periodDisplay.toLowerCase();
  
  // Find the first month mentioned (start month)
  for (const [monthName, monthNum] of Object.entries(SPANISH_MONTHS)) {
    if (lowerPeriod.includes(monthName)) {
      return monthNum;
    }
  }
  
  return 0;
};

/**
 * Sanitizes text by removing common data artifacts
 * - Removes double-double quotes ("") 
 * - Removes orphan quotes
 * - Removes trailing commas
 * - Replaces escaped newlines with spaces
 * - Normalizes whitespace
 */
export const sanitizeText = (text: string | null | undefined): string => {
  if (!text) return "";
  
  return text
    // Replace double-double quotes with single double quote
    .replace(/""/g, '"')
    // Remove orphan quotes at start/end
    .replace(/^"|"$/g, '')
    // Clean up escaped characters
    .replace(/\\r\\n|\\n|\\r/g, ' ')
    // Remove trailing commas
    .replace(/,\s*$/g, '')
    // Normalize multiple spaces
    .replace(/\s+/g, ' ')
    // Trim whitespace
    .trim();
};

/**
 * Formats company name for professional display
 * Transforms: 'Hotel "BENIDORM PLAZA"' -> 'Hotel "Benidorm Plaza"'
 * Transforms: 'Deutsches Haus,S.L"casa Alemana"' -> 'Deutsches Haus, S.L. "Casa Alemana"'
 */
export const formatCompanyName = (company: string | null | undefined): string => {
  if (!company) return "";
  
  let formatted = sanitizeText(company);
  
  // Fix missing space after comma in S.L, S.A, S.L.U, etc.
  formatted = formatted.replace(/,\s*S\.?L\.?U?\.?/gi, ', S.L.');
  formatted = formatted.replace(/,\s*S\.?A\.?/gi, ', S.A.');
  
  // Add space before opening quote if missing
  formatted = formatted.replace(/(\w)"(\w)/g, '$1 "$2');
  
  // Title case text inside quotes
  formatted = formatted.replace(/"([^"]+)"/g, (_, name) => {
    const titleCased = name
      .toLowerCase()
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return `"${titleCased}"`;
  });
  
  return formatted;
};

/**
 * Formats role text for consistent display
 */
export const formatRole = (role: string | null | undefined): string => {
  if (!role) return "";
  return sanitizeText(role);
};

/**
 * Formats period display text
 */
export const formatPeriod = (period: string | null | undefined): string => {
  if (!period) return "";
  return sanitizeText(period);
};

/**
 * Formats duration text
 */
export const formatDuration = (duration: string | null | undefined): string => {
  if (!duration) return "";
  return sanitizeText(duration);
};

interface Experience {
  id: string;
  company: string;
  role: string;
  period_display?: string | null;
  duration?: string | null;
  start_year?: number;
  end_year?: number | null;
  sort_order?: number | null;
}

/**
 * Sorts experiences in descending chronological order
 * Primary: start_year DESC
 * Secondary: start_month DESC (extracted from period_display)
 * Tertiary: end_year DESC (null = current, so first)
 * Quaternary: sort_order ASC
 */
export const sortExperiencesChronologically = (experiences: Experience[]): Experience[] => {
  return [...experiences].sort((a, b) => {
    // Primary sort: start_year descending (most recent first)
    const startYearDiff = (b.start_year || 0) - (a.start_year || 0);
    if (startYearDiff !== 0) return startYearDiff;
    
    // Secondary sort: start_month descending (for same year, later months first)
    const aMonth = extractStartMonth(a.period_display);
    const bMonth = extractStartMonth(b.period_display);
    const monthDiff = bMonth - aMonth;
    if (monthDiff !== 0) return monthDiff;
    
    // Tertiary sort: end_year descending (null = current = highest priority)
    const aEnd = a.end_year ?? 9999;
    const bEnd = b.end_year ?? 9999;
    const endDiff = bEnd - aEnd;
    if (endDiff !== 0) return endDiff;
    
    // Quaternary: sort_order ascending
    return (a.sort_order || 0) - (b.sort_order || 0);
  });
};

/**
 * Sanitizes all experience data
 */
export const sanitizeExperiences = (experiences: Experience[]): Experience[] => {
  const sorted = sortExperiencesChronologically(experiences);
  
  return sorted.map(exp => ({
    ...exp,
    company: formatCompanyName(exp.company),
    role: formatRole(exp.role),
    period_display: formatPeriod(exp.period_display),
    duration: formatDuration(exp.duration),
  }));
};

interface Education {
  id: string;
  title: string;
  description?: string | null;
  institution?: string | null;
}

/**
 * Sanitizes education data
 */
export const sanitizeEducation = (education: Education[]): Education[] => {
  return education.map(edu => ({
    ...edu,
    title: sanitizeText(edu.title),
    description: sanitizeText(edu.description),
    institution: sanitizeText(edu.institution),
  }));
};

interface Skill {
  id: string;
  title: string;
  description?: string | null;
  icon_name?: string | null;
}

/**
 * Sanitizes skills data
 */
export const sanitizeSkills = (skills: Skill[]): Skill[] => {
  return skills.map(skill => ({
    ...skill,
    title: sanitizeText(skill.title),
    description: sanitizeText(skill.description),
  }));
};

interface Contact {
  id: string;
  type: string;
  value: string;
  label?: string | null;
}

/**
 * Sanitizes contact data
 */
export const sanitizeContacts = (contacts: Contact[]): Contact[] => {
  return contacts.map(contact => ({
    ...contact,
    value: sanitizeText(contact.value),
    label: sanitizeText(contact.label),
  }));
};

interface Profile {
  full_name: string;
  profession?: string | null;
  photo_url?: string | null;
  nationality?: string | null;
  nationality_flag?: string | null;
  availability_status?: string | null;
  professional_summary?: string | null;
}

/**
 * Sanitizes profile data
 */
export const sanitizeProfile = (profile: Profile | null): Profile | null => {
  if (!profile) return null;
  
  return {
    ...profile,
    full_name: sanitizeText(profile.full_name),
    profession: sanitizeText(profile.profession),
    nationality: sanitizeText(profile.nationality),
    availability_status: sanitizeText(profile.availability_status),
    professional_summary: sanitizeText(profile.professional_summary),
  };
};
