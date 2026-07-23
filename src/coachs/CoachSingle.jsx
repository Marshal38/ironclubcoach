import { useState } from 'react';

function CoachSingle({ coach }) {
  const { name, image } = coach;
  const [imgError, setImgError] = useState(false);

  const imageSrc =
    !image || imgError ? '/blank-profile-picture-973460_1280-1.jpg' : image;

  return (
    <div className="flex flex-col items-center mt-5 rounded-xl hover:shadow-2xl/100 hover:shadow-emerald-900">
      <img
        src={imageSrc}
        alt={name}
        onError={() => setImgError(true)}
        className="w-full max-w-48 sm:max-w-70 aspect-square object-cover rounded-2xl shadow-lg/50"
      />
      <span className="text-center font-bold text-lg sm:text-3xl mt-2 sm:mt-4 mb-2 sm:mb-5">
        {name}
      </span>
    </div>
  );
}

export default CoachSingle;
