import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string | null;
  start_year: number;
  end_year: number | null;
  period_display: string | null;
  sort_order: number | null;
  created_at: string | null;
}

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_year', { ascending: false });
      
      if (error) throw error;
      return data as Experience[];
    },
  });
};

export const useAddExperience = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (experience: Omit<Experience, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('experiences')
        .insert(experience)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (experience: Partial<Experience> & { id: string }) => {
      const { data, error } = await supabase
        .from('experiences')
        .update(experience)
        .eq('id', experience.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
  });
};
