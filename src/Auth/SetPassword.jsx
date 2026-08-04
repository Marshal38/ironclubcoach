import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../services/supabase';

function SetPassword() {
  const [password, setPassword] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setIsReady(true);
      }
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      return;
    }
    navigate('/admin');
  }

  if (!isReady) {
    return <p className="text-center mt-20">Проверка ссылки...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-bold text-center">Установите пароль</h2>
      <input
        type="password"
        placeholder="Новый пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        className="border rounded-lg px-3 py-2"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        className="bg-[#0b3306] text-white rounded-lg py-2 hover:bg-[#86cf7e] hover:text-black transition"
      >
        Сохранить пароль
      </button>
    </form>
  );
}

export default SetPassword;
