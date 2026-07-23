import { Link } from 'react-router-dom';
import Logo from './Logo';

function Header() {
  return (
    <div className="flex flex-col lg:flex-row items-center sm:justify-between gap-4 px-[5%] mt-[3%]">
      <Logo />
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 mt-4 text-base sm:text-2xl">
        <Link
          to="/?affiliate=all"
          className="px-4 py-2 sm:px-6 sm:py-4 border-2 sm:border-4 rounded-full bg-[#0b3306] text-white tracking-wide transition hover:bg-[#86cf7e] hover:text-black font-semibold text-center"
        >
          Тренеры
        </Link>
        <Link
          to="/shedule"
          className="px-4 py-2 sm:px-6 sm:py-4 border-2 sm:border-4 rounded-full bg-[#0b3306] text-white transition hover:bg-[#86cf7e] hover:text-black font-semibold text-center"
        >
          Расписание
        </Link>
      </div>
    </div>
  );
}

export default Header;
