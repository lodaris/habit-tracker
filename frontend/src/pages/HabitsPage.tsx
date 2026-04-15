import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Habit } from '../types';
import { getHabits, createHabit, deleteHabit } from '../api/habits';

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // поля форми
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    getHabits()
      .then(data => { setHabits(data); setLoading(false); })
      .catch(() => { setError('Не вдалося завантажити звички'); setLoading(false); });
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) { setFormError("Назва обов'язкова"); return; }
    try {
      const habit = await createHabit({ name, description, category });
      setHabits(prev => [...prev, habit]);
      setName(''); setDescription(''); setCategory('');
      setFormError('');
    } catch {
      setFormError('Помилка при створенні');
    }
  };

  const handleDelete = async (id: number) => {
    await deleteHabit(id);
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Мої звички</h1>

      {/* Форма додавання */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd' }}>
        <h3>Додати звичку</h3>
        <div>
          <input
            placeholder="Назва *"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            placeholder="Опис"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            placeholder="Категорія"
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <button onClick={handleCreate}>Додати</button>
        </div>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
      </div>

      {/* Список звичок */}
      {habits.length === 0 ? (
        <p>Звичок ще немає, додай першу</p>
      ) : (
        habits.map(habit => (
          <div key={habit.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee' }}>
            <Link to={`/habits/${habit.id}`}><strong>{habit.name}</strong></Link>
            <span style={{ marginLeft: '10px', color: '#888' }}>{habit.category}</span>
            <button
              onClick={() => handleDelete(habit.id)}
              style={{ marginLeft: '15px', color: 'red' }}
            >
              Видалити
            </button>
          </div>
        ))
      )}
    </div>
  );
}