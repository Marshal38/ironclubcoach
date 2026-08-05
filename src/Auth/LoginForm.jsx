import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './useLogin';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending, error } = useLogin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    login(
      { email, password },
      { onSuccess: () => navigate('/staff-admin-x2z8') }
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm w-full p-6 bg-white rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-bold text-center">Вход для тренеров</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded-lg px-3 py-2"
        />
        {error && <p className="text-red-600 text-sm">{error.message}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#0b3306] text-white rounded-lg py-2 hover:bg-[#86cf7e] hover:text-black transition disabled:opacity-50"
        >
          {isPending ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
