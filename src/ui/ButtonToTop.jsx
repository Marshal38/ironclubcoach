import { useState, useEffect } from 'react';
import { HiArrowUp } from 'react-icons/hi2';

function ButtonToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 300);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Наверх"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-15 h-15 rounded-full bg-[#0b3306] animate-bounce text-white shadow-lg transition hover:bg-[#86cf7e] hover:text-black hover:scale-110 hover:animate-none"
    >
      <HiArrowUp className="text-2xl" />
    </button>
  );
}

export default ButtonToTop;
