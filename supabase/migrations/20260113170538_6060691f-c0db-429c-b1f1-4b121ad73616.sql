-- 1) Remove public read access to private profile table
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profile'
      AND policyname = 'Public can view profile'
  ) THEN
    EXECUTE 'DROP POLICY "Public can view profile" ON public.profile';
  END IF;
END $$;

-- Ensure admins can still read profile for the admin UI
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profile'
      AND policyname = 'Admins can view profile'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Admins can view profile"
      ON public.profile
      FOR SELECT
      USING (public.has_role(auth.uid(), 'admin'::public.app_role))
    $pol$;
  END IF;
END $$;

-- 2) Create a public-safe profile table for the public CV pages
CREATE TABLE IF NOT EXISTS public.profile_public (
  id uuid PRIMARY KEY,
  full_name text NOT NULL DEFAULT ''::text,
  profession text NULL,
  photo_url text NULL,
  professional_summary text NULL,
  location text NULL,
  nationality text NULL,
  nationality_flag text NULL,
  availability_status text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profile_public ENABLE ROW LEVEL SECURITY;

-- Public can read public-safe profile
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profile_public'
      AND policyname = 'Public can view profile_public'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Public can view profile_public"
      ON public.profile_public
      FOR SELECT
      USING (true)
    $pol$;
  END IF;
END $$;

-- Admins can manage public-safe profile
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profile_public'
      AND policyname = 'Admins can manage profile_public'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Admins can manage profile_public"
      ON public.profile_public
      FOR ALL
      USING (public.has_role(auth.uid(), 'admin'::public.app_role))
      WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role))
    $pol$;
  END IF;
END $$;

-- 3) Keep profile_public in sync with profile (so admin edits continue to work)
CREATE OR REPLACE FUNCTION public.sync_profile_public_from_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    DELETE FROM public.profile_public WHERE id = OLD.id;
    RETURN OLD;
  END IF;

  INSERT INTO public.profile_public (
    id,
    full_name,
    profession,
    photo_url,
    professional_summary,
    location,
    nationality,
    nationality_flag,
    availability_status,
    updated_at
  ) VALUES (
    NEW.id,
    COALESCE(NEW.full_name, ''),
    NEW.profession,
    NEW.photo_url,
    NEW.professional_summary,
    NEW.location,
    NEW.nationality,
    NEW.nationality_flag,
    NEW.availability_status,
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    profession = EXCLUDED.profession,
    photo_url = EXCLUDED.photo_url,
    professional_summary = EXCLUDED.professional_summary,
    location = EXCLUDED.location,
    nationality = EXCLUDED.nationality,
    nationality_flag = EXCLUDED.nationality_flag,
    availability_status = EXCLUDED.availability_status,
    updated_at = EXCLUDED.updated_at;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS sync_profile_public_aiu ON public.profile;
CREATE TRIGGER sync_profile_public_aiu
AFTER INSERT OR UPDATE ON public.profile
FOR EACH ROW
EXECUTE FUNCTION public.sync_profile_public_from_profile();

DROP TRIGGER IF EXISTS sync_profile_public_d ON public.profile;
CREATE TRIGGER sync_profile_public_d
AFTER DELETE ON public.profile
FOR EACH ROW
EXECUTE FUNCTION public.sync_profile_public_from_profile();

-- 4) Backfill profile_public from existing profile rows
INSERT INTO public.profile_public (
  id,
  full_name,
  profession,
  photo_url,
  professional_summary,
  location,
  nationality,
  nationality_flag,
  availability_status,
  updated_at
)
SELECT
  p.id,
  COALESCE(p.full_name, ''),
  p.profession,
  p.photo_url,
  p.professional_summary,
  p.location,
  p.nationality,
  p.nationality_flag,
  p.availability_status,
  now()
FROM public.profile p
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  profession = EXCLUDED.profession,
  photo_url = EXCLUDED.photo_url,
  professional_summary = EXCLUDED.professional_summary,
  location = EXCLUDED.location,
  nationality = EXCLUDED.nationality,
  nationality_flag = EXCLUDED.nationality_flag,
  availability_status = EXCLUDED.availability_status,
  updated_at = EXCLUDED.updated_at;
