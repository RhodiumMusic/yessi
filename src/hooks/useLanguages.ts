import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Language {
  id: string;
  name: string;
  level: string;
  proficiency_percent: number | null;
  sort_order: number | null;
  created_at: string | null;
}

export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Language[];
    },
  });
};

export const useAddLanguage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (language: Omit<Language, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('languages')
        .insert(language)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
};

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (language: Partial<Language> & { id: string }) => {
      const { data, error } = await supabase
        .from('languages')
        .update(language)
        .eq('id', language.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
};

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('languages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
};
