import { useNavigate } from 'react-router-dom';

function ModalWindow({ children }) {
  const navigate = useNavigate();

  function handleClose(e) {
    if (e.target === e.currentTarget) navigate(-1);
  }
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-[90%] max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-6 text-4xl text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default ModalWindow;
