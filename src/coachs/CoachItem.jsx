import { useState } from 'react';
import {
  HiAcademicCap,
  HiHome,
  HiIdentification,
  HiMiniBookOpen,
  HiMiniUser,
  HiMiniUserGroup,
  HiMiniUsers,
  HiTrophy,
} from 'react-icons/hi2';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useCoaches } from './useCoaches';
import Spinner from '../ui/Spinner';

function CoachItem() {
  const { id } = useParams();
  const { coaches, isLoading, error } = useCoaches();
  const [imgError, setImgError] = useState(false);

  if (isLoading) return <Spinner />;
  if (error) return <p>Ошибка загрузки</p>;

  const coach = coaches.find((c) => String(c.id) === id);

  if (!coach) return <p>Тренер не найден</p>;

  const {
    name,
    personal_price,
    split_price,
    group_price,
    description,
    achievements,
    experience,
    affiliate,
    specializing,
    image,
    insta,
  } = coach;

  const imageSrc =
    !image || imgError ? '/blank-profile-picture-973460_1280-1.jpg' : image;

  const achievementsList = (achievements ?? '')
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean);

  const specializingList = (specializing ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col items-center rounded-xl text-base sm:text-xl px-4 sm:px-0">
      <img
        src={imageSrc}
        alt={name}
        onError={() => setImgError(true)}
        className="w-full max-w-60 sm:max-w-100 aspect-square object-cover rounded-2xl mt-3 shadow-lg/50"
      />
      <ul className="flex flex-col w-full sm:w-150 max-w-150 ml-0 sm:ml-1.5 mt-3">
        <li className="text-center font-bold text-2xl sm:text-3xl mt-3">
          {name}
        </li>

        <li className="flex text-justify gap-2 mt-3">
          <HiMiniUser className="mt-1 text-gray-500 shrink-0" /> Персонально:{' '}
          {personal_price} за 10 тренировок
        </li>

        <li className="flex gap-2 mt-2">
          <HiMiniUsers className="mt-1 text-gray-500 shrink-0" />
          Сплит: {split_price} за 10 тренировок
        </li>

        {group_price && (
          <li className="flex text-justify mt-2 gap-2">
            <HiMiniUserGroup className="mt-1 text-gray-500 shrink-0" />
            <div>Мини-группа: {group_price} за 10 тренировок</div>
          </li>
        )}

        <li className="flex items-start mt-2 gap-2">
          <HiMiniBookOpen className="mt-0.5 shrink-0 text-gray-500" />
          <div className="text-left">{description}</div>
        </li>

        {achievementsList.length > 0 &&
          achievementsList.map((item, index) => (
            <li
              key={index}
              className="flex items-start mt-2 text-justify gap-2"
            >
              <HiTrophy className="mt-1 shrink-0 text-gray-500" />
              {item}
            </li>
          ))}

        <li className="flex mt-2 gap-2">
          <HiIdentification className="mt-1 shrink-0 text-gray-500" />
          <div className="text-left">{experience}</div>
        </li>

        <li className="flex mt-2 gap-2">
          <HiHome className="mt-1 text-gray-500 shrink-0" />
          {affiliate}
        </li>

        {specializingList.map((item, index) => (
          <li key={index} className="flex items-start text-justify gap-2 mt-2">
            <HiAcademicCap className="mt-1 text-gray-500 shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="flex mb-3 justify-center gap-8 sm:gap-10 text-3xl sm:text-4xl w-full mt-1">
        <a
          href="https://wa.me/77777777777"
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-all duration-300 hover:text-[#25D366] hover:scale-110 z-10 relative cursor-pointer"
        >
          <FaWhatsapp />
        </a>

        <a
          href={insta}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-all duration-300 hover:text-[#E1306C] hover:scale-110 z-10 relative cursor-pointer"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  );
}

export default CoachItem;
