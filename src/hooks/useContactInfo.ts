import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ContactInfo {
  id: string;
  type: string;
  value: string;
  label: string | null;
  icon_name: string | null;
  sort_order: number | null;
  created_at: string | null;
}

export const useContactInfo = () => {
  return useQuery({
    queryKey: ['contact_info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as ContactInfo[];
    },
  });
};

export const useAddContactInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contactInfo: Omit<ContactInfo, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('contact_info')
        .insert(contactInfo)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_info'] });
    },
  });
};

export const useUpdateContactInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contactInfo: Partial<ContactInfo> & { id: string }) => {
      const { data, error } = await supabase
        .from('contact_info')
        .update(contactInfo)
        .eq('id', contactInfo.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_info'] });
    },
  });
};

export const useDeleteContactInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_info')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_info'] });
    },
  });
};
