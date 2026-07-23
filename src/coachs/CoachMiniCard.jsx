import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function CoachMiniCard({ coach, isPast }) {
  const location = useLocation();
  const [imgError, setImgError] = useState(false);

  const imageSrc =
    !coach.image || imgError
      ? '/blank-profile-picture-973460_1280-1.jpg'
      : coach.image;

  const className = `flex flex-col items-center gap-1 rounded-lg  p-1.5 transition-shadow ${
    isPast
      ? 'bg-gray-100 cursor-not-allowed'
      : 'bg-white hover:shadow-md cursor-pointer hover:bg-emerald-50'
  }`;

  const content = (
    <>
      <img
        src={imageSrc}
        alt={coach.name}
        onError={() => setImgError(true)}
        className={`w-25 h-25 sm:w-40 sm:h-40 rounded-full object-cover ${
          isPast ? 'grayscale opacity-60' : ''
        }`}
      />
      <span
        className={`text-md sm:text-xl text-center font-semibold leading-tight line-clamp-2 ${
          isPast ? 'text-gray-400' : 'text-gray-700'
        }`}
      >
        {coach.name}
      </span>
    </>
  );

  if (isPast) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link
      to={`/coach/${coach.id}`}
      className={className}
      state={{ backgroundLocation: location }}
    >
      {content}
    </Link>
  );
}

export default CoachMiniCard;
