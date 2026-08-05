import { useState } from 'react';

function CoachSingle({ coach }) {
  const { name, image } = coach;
  const [imgError, setImgError] = useState(false);

  const imageSrc =
    !image || imgError ? '/blank-profile-picture-973460_1280-1.jpg' : image;

  return (
    <div className="flex flex-col items-center mt-5 rounded-xl hover:scale-120 ">
      <img
        src={imageSrc}
        alt={name}
        onError={() => setImgError(true)}
        className="w-full max-w-48 sm:max-w-65 aspect-square object-cover object-[center_32%] rounded-2xl shadow-lg/50 "
      />
      <span className="relative text-center font-bold text-lg sm:text-3xl mt-3 sm:mt-4 mb-2 sm:mb-5 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-full after:-translate-x-1/2 after:origin-center after:scale-x-0 after:bg-[#0b3306] after:transition-transform after:duration-300 group-hover:after:scale-x-100">
        {name}
      </span>
    </div>
  );
}

export default CoachSingle;
