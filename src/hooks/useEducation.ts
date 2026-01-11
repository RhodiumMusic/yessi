import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Education {
  id: string;
  title: string;
  description: string | null;
  institution: string | null;
  year: number | null;
  sort_order: number | null;
  created_at: string | null;
}

export const useEducation = () => {
  return useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Education[];
    },
  });
};

export const useAddEducation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (education: Omit<Education, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('education')
        .insert(education)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education'] });
    },
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (education: Partial<Education> & { id: string }) => {
      const { data, error } = await supabase
        .from('education')
        .update(education)
        .eq('id', education.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education'] });
    },
  });
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education'] });
    },
  });
};
