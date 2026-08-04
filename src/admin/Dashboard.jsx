import { useState, useEffect } from 'react';
import { useCoachProfile } from './useCoachProfile';
import { useUpdateProfile } from './useUpdateProfile';
import supabase from '../services/supabase';
import { useNavigate } from 'react-router-dom';
import Spinner from '../ui/Spinner';
import { useUploadPhoto } from './usePhoto';

function Dashboard() {
  const { data: coach, isLoading, error } = useCoachProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { mutate: uploadPhoto, isPending: isUploading } = useUploadPhoto();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  useEffect(() => {
    if (coach) setForm(coach);
  }, [coach]);

  if (isLoading) return <Spinner />;
  if (error) return <p>Ошибка загрузки профиля</p>;
  if (!form) return null;

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { id, ...updates } = form;
    updateProfile({ id, updates });
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/staff-entry-x8z2');
  }

  async function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const { data: userData } = await supabase.auth.getUser();
    uploadPhoto({ file, coachId: form.id, userId: userData.user.id });
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Мой профиль</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-600"
        >
          Выйти
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Имя</span>
          <input
            value={form.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Описание</span>
          <textarea
            value={form.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            className="border rounded-lg px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">
            Персонально (цена за 10 тренировок)
          </span>
          <input
            value={form.personal_price || ''}
            onChange={(e) => handleChange('personal_price', e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">
            Сплит (цена за 10 тренировок)
          </span>
          <input
            value={form.split_price || ''}
            onChange={(e) => handleChange('split_price', e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Достижения (через ;)</span>
          <textarea
            value={form.achievements || ''}
            onChange={(e) => handleChange('achievements', e.target.value)}
            rows={3}
            className="border rounded-lg px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Опыт работы</span>
          <input
            value={form.experience || ''}
            onChange={(e) => handleChange('experience', e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Ссылка на Instagram</span>
          <input
            value={form.insta || ''}
            onChange={(e) => handleChange('insta', e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Фото профиля</span>
          {form.image && (
            <img
              src={form.image}
              alt="Текущее фото"
              className="w-32 h-32 object-cover rounded-xl mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            disabled={isUploading}
            className="border rounded-lg px-3 py-2"
          />
          {isUploading && (
            <span className="text-sm text-gray-500">Загрузка...</span>
          )}
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="bg-[#0b3306] text-white rounded-lg py-3 mt-2 hover:bg-[#86cf7e] hover:text-black transition disabled:opacity-50"
        >
          {isPending ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
