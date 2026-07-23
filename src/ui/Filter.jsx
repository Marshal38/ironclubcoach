import { useSearchParams } from 'react-router-dom';

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-5 mt-6 sm:mt-10 px-[5%]">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`flex text-sm sm:text-2xl gap-2 sm:gap-3 px-3 py-2 sm:px-6 sm:py-4 rounded-full border-2 sm:border-4 transition ${
            option.value === currentFilter
              ? 'bg-[#86cf7e] border-[#0b3306] text-black font-semibold'
              : 'bg-[#0b3306] text-white hover:bg-[#86cf7e] hover:text-black font-semibold'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
