import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useCoaches } from './useCoaches';
import CoachSingle from './CoachSingle';
import Spinner from '../ui/Spinner';

function CoachList() {
  const { isLoading, coaches, error } = useCoaches();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  if (isLoading) return <Spinner />;
  if (error) return <p>Ошибка загрузки</p>;

  const filterValue = searchParams.get('affiliate') || 'all';

  let filteredCoach;

  if (filterValue === 'all') filteredCoach = coaches;
  if (filterValue === 'Сарыарка')
    filteredCoach = coaches.filter((coach) => coach.affiliate === 'Сарыарка');
  if (filterValue === 'Бараева')
    filteredCoach = coaches.filter((coach) => coach.affiliate === 'Бараева');
  if (filterValue === 'Конаева')
    filteredCoach = coaches.filter((coach) => coach.affiliate === 'Конаева');
  if (filterValue === 'Сыганак')
    filteredCoach = coaches.filter((coach) => coach.affiliate === 'Сыганак');
  if (filterValue === 'Нажимеденова')
    filteredCoach = coaches.filter(
      (coach) => coach.affiliate === 'Нажимеденова'
    );
  if (filterValue === 'Женис')
    filteredCoach = coaches.filter((coach) => coach.affiliate === 'Женис');
  if (filterValue === 'Орынбор')
    filteredCoach = coaches.filter((coach) => coach.affiliate === 'Орынбор');
  if (filterValue === 'Кудайбердыулы')
    filteredCoach = coaches.filter(
      (coach) => coach.affiliate === 'Кудайбердыулы'
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 w-full px-4">
      {filteredCoach.filter(Boolean).map((coach) => (
        <Link
          key={coach.id}
          to={`/coach/${coach.id}`}
          state={{ backgroundLocation: location }}
        >
          <CoachSingle coach={coach} />
        </Link>
      ))}
    </div>
  );
}

export default CoachList;
