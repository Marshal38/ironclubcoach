import { useState, useEffect } from 'react';
import ScheduleTable from './ScheduleTable';
import { useSchedule } from './useSchedule';
import Spinner from '../ui/Spinner';

function getToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

const TODAY = getToday();

function useDaysCount() {
  const [daysCount, setDaysCount] = useState(window.innerWidth < 1024 ? 3 : 7);

  useEffect(() => {
    function handleResize() {
      setDaysCount(window.innerWidth < 1024 ? 3 : 7);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return daysCount;
}

function getDatesRange(startDate, count) {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });
}

function ScheduleMain() {
  const daysCount = useDaysCount();
  const [rangeStart, setRangeStart] = useState(TODAY);

  // При смене daysCount (например, поворот телефона/ресайз) держим начало на сегодняшнем дне, если были в начале
  useEffect(() => {
    setRangeStart((prev) => (prev < TODAY ? TODAY : prev));
  }, [daysCount]);

  const dates = getDatesRange(rangeStart, daysCount);
  const rangeEnd = dates[dates.length - 1];

  const {
    data: schedule,
    isLoading,
    error,
  } = useSchedule(rangeStart, daysCount);

  if (isLoading) return <Spinner />;
  if (error) return <p>Ошибка загрузки расписания</p>;

  const isAtStart = rangeStart.getTime() <= TODAY.getTime();

  function goToPrev() {
    if (isAtStart) return;
    const prev = new Date(rangeStart);
    prev.setDate(prev.getDate() - daysCount);
    setRangeStart(prev < TODAY ? TODAY : prev);
  }

  function goToNext() {
    const next = new Date(rangeStart);
    next.setDate(next.getDate() + daysCount);
    setRangeStart(next);
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-0 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold sm:ml-[5%] text-center sm:text-left">
          Записаться на тренировку
        </h1>
        <div className="flex gap-2 sm:mr-[5%]">
          <button
            onClick={goToPrev}
            disabled={isAtStart}
            className="px-3 py-2 sm:px-4 text-sm sm:text-base bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-800"
          >
            ← Назад
          </button>
          <button
            onClick={goToNext}
            className="px-3 py-2 sm:px-4 text-sm sm:text-base bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            Вперёд →
          </button>
        </div>
      </div>

      <ScheduleTable schedule={schedule} dates={dates} />
    </div>
  );
}

export default ScheduleMain;
