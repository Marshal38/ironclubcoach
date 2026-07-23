import { useQuery } from '@tanstack/react-query';
import supabase from '../services/supabase';

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function useSchedule(weekStart) {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const startStr = formatDate(weekStart);
  const endStr = formatDate(weekEnd);

  return useQuery({
    queryKey: ['schedule', startStr, endStr],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schedule')
        .select('date, time, coach:coach_id(id, name, image, affiliate)')
        .gte('date', startStr)
        .lte('date', endStr);

      if (error) throw new Error('Не удалось загрузить расписание');
      return data;
    },
  });
}
