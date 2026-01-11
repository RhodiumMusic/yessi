-- Enum para roles de usuario
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Tabla de roles de usuario
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Función para verificar roles (security definer para evitar recursión)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Políticas RLS para user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Tabla de perfil principal
CREATE TABLE public.profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL DEFAULT '',
  birth_date TEXT,
  location TEXT,
  phone TEXT,
  nationality TEXT,
  nationality_flag TEXT,
  profession TEXT,
  photo_url TEXT,
  availability_status TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

-- Políticas para profile (lectura pública, escritura solo admin)
CREATE POLICY "Public can view profile"
ON public.profile
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can update profile"
ON public.profile
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert profile"
ON public.profile
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Experiencia laboral con ordenamiento automático por año
CREATE TABLE public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  duration TEXT,
  start_year INT NOT NULL,
  end_year INT,
  period_display TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view experiences"
ON public.experiences
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage experiences"
ON public.experiences
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Formación académica
CREATE TABLE public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  institution TEXT,
  year INT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view education"
ON public.education
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage education"
ON public.education
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Idiomas
CREATE TABLE public.languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  level TEXT NOT NULL,
  proficiency_percent INT DEFAULT 100,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view languages"
ON public.languages
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage languages"
ON public.languages
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Cualidades personales
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT DEFAULT 'Star',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view skills"
ON public.skills
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage skills"
ON public.skills
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Información de contacto
CREATE TABLE public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  value TEXT NOT NULL,
  label TEXT,
  icon_name TEXT DEFAULT 'Phone',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view contact_info"
ON public.contact_info
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage contact_info"
ON public.contact_info
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger para profile
CREATE TRIGGER update_profile_updated_at
BEFORE UPDATE ON public.profile
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Crear bucket para fotos de perfil
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true);

-- Políticas de storage
CREATE POLICY "Public can view profile photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'profile-photos');

CREATE POLICY "Admins can upload profile photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update profile photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete profile photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile-photos' AND public.has_role(auth.uid(), 'admin'));