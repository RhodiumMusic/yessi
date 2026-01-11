import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Profile {
  id: string;
  full_name: string;
  birth_date: string | null;
  location: string | null;
  phone: string | null;
  nationality: string | null;
  nationality_flag: string | null;
  profession: string | null;
  photo_url: string | null;
  availability_status: string | null;
  professional_summary: string | null;
  updated_at: string | null;
}

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .maybeSingle();
      
      if (error) throw error;
      return data as Profile | null;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profile: Partial<Profile> & { id: string }) => {
      const { data, error } = await supabase
        .from('profile')
        .update(profile)
        .eq('id', profile.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
