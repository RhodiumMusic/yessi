import { z } from 'zod';

// Maximum field lengths
const MAX_SHORT_TEXT = 100;
const MAX_MEDIUM_TEXT = 255;
const MAX_LONG_TEXT = 500;

// Year validation range
const MIN_YEAR = 1900;
const MAX_YEAR = 2100;

// File upload limits
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// Contact validation schemas
export const contactSchema = z.object({
  type: z.enum(['phone', 'location', 'email', 'website', 'whatsapp', 'linkedin']),
  value: z.string()
    .trim()
    .min(1, 'El valor es requerido')
    .max(MAX_MEDIUM_TEXT, `Máximo ${MAX_MEDIUM_TEXT} caracteres`),
  label: z.string()
    .trim()
    .max(MAX_SHORT_TEXT, `Máximo ${MAX_SHORT_TEXT} caracteres`)
    .optional()
    .or(z.literal('')),
  icon_name: z.string().max(50).optional(),
  sort_order: z.number().int().min(0).max(1000).optional(),
});

// Experience validation schema
export const experienceSchema = z.object({
  company: z.string()
    .trim()
    .min(1, 'La empresa es requerida')
    .max(MAX_MEDIUM_TEXT, `Máximo ${MAX_MEDIUM_TEXT} caracteres`),
  role: z.string()
    .trim()
    .min(1, 'El puesto es requerido')
    .max(MAX_MEDIUM_TEXT, `Máximo ${MAX_MEDIUM_TEXT} caracteres`),
  start_year: z.number()
    .int()
    .min(MIN_YEAR, `El año debe ser mayor a ${MIN_YEAR}`)
    .max(MAX_YEAR, `El año debe ser menor a ${MAX_YEAR}`),
  end_year: z.number()
    .int()
    .min(MIN_YEAR, `El año debe ser mayor a ${MIN_YEAR}`)
    .max(MAX_YEAR, `El año debe ser menor a ${MAX_YEAR}`)
    .nullable()
    .optional(),
  duration: z.string()
    .trim()
    .max(MAX_SHORT_TEXT, `Máximo ${MAX_SHORT_TEXT} caracteres`)
    .optional()
    .or(z.literal('')),
  period_display: z.string()
    .trim()
    .max(MAX_SHORT_TEXT, `Máximo ${MAX_SHORT_TEXT} caracteres`)
    .optional()
    .or(z.literal('')),
}).refine(
  (data) => !data.end_year || data.end_year >= data.start_year,
  { message: 'El año de fin debe ser mayor o igual al año de inicio', path: ['end_year'] }
);

// Education validation schema
export const educationSchema = z.object({
  title: z.string()
    .trim()
    .min(1, 'El título es requerido')
    .max(MAX_MEDIUM_TEXT, `Máximo ${MAX_MEDIUM_TEXT} caracteres`),
  description: z.string()
    .trim()
    .max(MAX_LONG_TEXT, `Máximo ${MAX_LONG_TEXT} caracteres`)
    .optional()
    .or(z.literal('')),
  institution: z.string()
    .trim()
    .max(MAX_MEDIUM_TEXT, `Máximo ${MAX_MEDIUM_TEXT} caracteres`)
    .optional()
    .or(z.literal('')),
  year: z.number()
    .int()
    .min(MIN_YEAR, `El año debe ser mayor a ${MIN_YEAR}`)
    .max(MAX_YEAR, `El año debe ser menor a ${MAX_YEAR}`)
    .nullable()
    .optional(),
  sort_order: z.number().int().min(0).max(1000).optional(),
});

// Skills validation schema
export const skillSchema = z.object({
  title: z.string()
    .trim()
    .min(1, 'El título es requerido')
    .max(MAX_MEDIUM_TEXT, `Máximo ${MAX_MEDIUM_TEXT} caracteres`),
  description: z.string()
    .trim()
    .max(MAX_LONG_TEXT, `Máximo ${MAX_LONG_TEXT} caracteres`)
    .optional()
    .or(z.literal('')),
  icon_name: z.string().max(50).optional(),
  sort_order: z.number().int().min(0).max(1000).optional(),
});

// Language validation schema
export const languageSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'El nombre es requerido')
    .max(MAX_SHORT_TEXT, `Máximo ${MAX_SHORT_TEXT} caracteres`),
  level: z.string()
    .trim()
    .min(1, 'El nivel es requerido')
    .max(MAX_SHORT_TEXT, `Máximo ${MAX_SHORT_TEXT} caracteres`),
  proficiency_percent: z.number()
    .int()
    .min(0, 'El porcentaje debe ser entre 0 y 100')
    .max(100, 'El porcentaje debe ser entre 0 y 100')
    .optional(),
  sort_order: z.number().int().min(0).max(1000).optional(),
});

// Profile validation schema
export const profileSchema = z.object({
  full_name: z.string()
    .trim()
    .max(MAX_MEDIUM_TEXT, `Máximo ${MAX_MEDIUM_TEXT} caracteres`)
    .optional()
    .or(z.literal('')),
  birth_date: z.string()
    .trim()
    .max(50, 'Formato de fecha inválido')
    .optional()
    .or(z.literal('')),
  location: z.string()
    .trim()
    .max(MAX_MEDIUM_TEXT, `Máximo ${MAX_MEDIUM_TEXT} caracteres`)
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .trim()
    .max(50, 'Teléfono demasiado largo')
    .optional()
    .or(z.literal('')),
  nationality: z.string()
    .trim()
    .max(MAX_SHORT_TEXT, `Máximo ${MAX_SHORT_TEXT} caracteres`)
    .optional()
    .or(z.literal('')),
  nationality_flag: z.string()
    .trim()
    .max(10, 'Emoji de bandera inválido')
    .optional()
    .or(z.literal('')),
  profession: z.string()
    .trim()
    .max(MAX_MEDIUM_TEXT, `Máximo ${MAX_MEDIUM_TEXT} caracteres`)
    .optional()
    .or(z.literal('')),
  availability_status: z.string()
    .trim()
    .max(MAX_SHORT_TEXT, `Máximo ${MAX_SHORT_TEXT} caracteres`)
    .optional()
    .or(z.literal('')),
  photo_url: z.string()
    .trim()
    .max(1000, 'URL demasiado larga')
    .optional()
    .or(z.literal('')),
});

// File validation function
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'El archivo es demasiado grande. Máximo 5MB.' };
  }
  
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Tipo de archivo no permitido. Use JPG, PNG, GIF o WEBP.' };
  }
  
  return { valid: true };
};

// Helper to format validation errors
export const formatValidationErrors = (error: z.ZodError): string => {
  return error.errors.map(e => e.message).join(', ');
};
