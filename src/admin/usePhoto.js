import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../services/supabase';

export function useUploadPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, coachId, userId }) => {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${coachId}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('coach-photos')
        .upload(filePath, file);

      if (uploadError) throw new Error('Не удалось загрузить фото');

      const { data: urlData } = supabase.storage
        .from('coach-photos')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('coach')
        .update({ image: urlData.publicUrl })
        .eq('id', coachId);

      if (updateError) throw new Error('Не удалось сохранить фото в профиле');

      return urlData.publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-profile'] });
      queryClient.invalidateQueries({ queryKey: ['coach'] });
    },
  });
}
