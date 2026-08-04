import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../services/supabase';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }) => {
      const { data, error } = await supabase
        .from('coach')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw new Error('Не удалось сохранить изменения');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-profile'] });
      queryClient.invalidateQueries({ queryKey: ['coach'] });
    },
  });
}
