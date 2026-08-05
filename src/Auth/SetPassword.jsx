import { useState, useEffect } from 'react';
import supabase from '../services/supabase';

function SetPassword() {
  const [password, setPassword] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session && active) {
        setIsReady(true);
        return;
      }

      const code = new URLSearchParams(window.location.search).get('code');

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!active) return;

        if (error) {
          setError('Ссылка недействительна или устарела');
        } else {
          window.history.replaceState({}, '', '/');
          setIsReady(true);
        }
      }
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && active) setIsReady(true);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      return;
    }
    setIsDone(true);
    window.location.replace('/staff-admin-x2z8');
  }

  if (isDone) return null;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

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
