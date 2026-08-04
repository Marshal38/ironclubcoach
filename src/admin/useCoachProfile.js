import { useQuery } from '@tanstack/react-query';
import supabase from '../services/supabase';

export function useCoachProfile() {
  return useQuery({
    queryKey: ['my-profile'],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('coach')
        .select('*')
        .eq('user_id', userData.user.id)
        .single();

      if (error) throw new Error('Не удалось загрузить профиль');
      return data;
    },
  });
}
