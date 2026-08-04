import { useMutation } from '@tanstack/react-query';
import supabase from '../services/supabase';

export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error('Неверный email или пароль');
      return data;
    },
  });
}
