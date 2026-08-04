import { useState, useEffect } from 'react';
import supabase from '../services/supabase';

function SetPassword() {
  const [password, setPassword] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setIsReady(true);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      return;
    }
    setIsDone(true);
    // убираем токены из URL и уводим на админку
    window.location.replace('/staff-admin-x2z8');
  }

  if (isDone) return null;

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Проверка ссылки...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm w-full mx-4 p-6 bg-white rounded-xl shadow-lg"
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
    </div>
  );
}

export default SetPassword;
