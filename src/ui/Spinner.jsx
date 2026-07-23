function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-60 h-60">
        <div className="absolute inset-0 rounded-full border-6 border-gray-200 border-t-red-600 animate-spin" />{' '}
        <img
          src="/logo.png"
          alt="Loading"
          className="absolute inset-0 ml-13 mt-10 w-35 h-35"
        />
      </div>
    </div>
  );
}

export default Spinner;
