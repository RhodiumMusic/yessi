import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PublicProfile {
  id: string;
  full_name: string;
  profession: string | null;
  photo_url: string | null;
  professional_summary: string | null;
  location: string | null;
  nationality: string | null;
  nationality_flag: string | null;
  availability_status: string | null;
}

export const usePublicProfile = () => {
  return useQuery({
    queryKey: ['profile_public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_public')
        .select('*')
        .maybeSingle();
      
      if (error) throw error;
      return data as PublicProfile | null;
    },
  });
};
