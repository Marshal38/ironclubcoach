import { useSearchParams } from 'react-router-dom';
import CoachMiniCard from '../coachs/CoachMiniCard';

const TIME_SLOTS = [
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];

const DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isSlotPast(date, time) {
  const [hours, minutes] = time.split(':').map(Number);
  const slotDateTime = new Date(date);
  slotDateTime.setHours(hours, minutes, 0, 0);
  return slotDateTime < new Date();
}

function ScheduleTable({ schedule, dates }) {
  const [searchParams] = useSearchParams();
  const affiliateFilter = searchParams.get('affiliate') || 'all';

  if (affiliateFilter === 'all') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center mx-[5%] sm:ml-[20%] sm:mr-[20%] bg-[#0b3306] rounded-2xl">
        <p className="text-lg sm:text-2xl font-bold text-amber-50 px-4">
          Выберите филиал, чтобы посмотреть расписание
        </p>
      </div>
    );
  }

  const filteredSchedule = schedule.filter(
    (item) => item.coach.affiliate === affiliateFilter
  );

  function getSlot(date, time) {
    const dateStr = formatDate(date);
    return filteredSchedule.filter(
      (item) => item.date === dateStr && item.time.startsWith(time)
    );
  }

  return (
    <div className="overflow-hidden rounded-xl shadow-lg/70">
      <div
        className="grid"
        style={{ gridTemplateColumns: `60px repeat(${dates.length}, 1fr)` }}
      >
        <div className="sticky top-0 left-0 z-20 bg-[#0b3306]" />

        {dates.map((date, i) => (
          <div
            key={i}
            className="sticky top-0 z-10 bg-[#0b3306] text-white text-center py-2 sm:py-3 border-l border-gray-700"
          >
            <div className="text-sm sm:text-md font-bold">
              {DAY_LABELS[date.getDay() === 0 ? 6 : date.getDay() - 1]}
            </div>
            <div className="text-base sm:text-xl text-gray-200">
              {date.getDate()}.{String(date.getMonth() + 1).padStart(2, '0')}
            </div>
          </div>
        ))}

        {TIME_SLOTS.map((time) => (
          <div key={time} className="contents">
            <div className="sticky left-0 z-10 bg-[#0b3306] flex items-center justify-center text-xs sm:text-xl font-medium text-gray-200 border-t border-gray-200 py-3 sm:py-4">
              {time}
            </div>

            {dates.map((date, i) => {
              const slotItems = getSlot(date, time);
              const isPast = isSlotPast(date, time);
              return (
                <div
                  key={i}
                  className="border-t border-l border-gray-200 min-h-16 sm:min-h-20 items-start justify-center bg-white"
                >
                  {slotItems.map(({ coach }) => (
                    <CoachMiniCard
                      key={coach.id}
                      coach={coach}
                      isPast={isPast}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleTable;
