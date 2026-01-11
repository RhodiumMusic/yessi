import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Skill {
  id: string;
  title: string;
  description: string | null;
  icon_name: string | null;
  sort_order: number | null;
  created_at: string | null;
}

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Skill[];
    },
  });
};

export const useAddSkill = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (skill: Omit<Skill, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('skills')
        .insert(skill)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (skill: Partial<Skill> & { id: string }) => {
      const { data, error } = await supabase
        .from('skills')
        .update(skill)
        .eq('id', skill.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
};
