import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Habit, HabitLog } from '../types';
import { getHabit, getLogsByHabit, createLog, deleteLog } from '../api/habits';

export default function HabitDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');

  useEffect(() => {
    Promise.all([
      getHabit(Number(id)),
      getLogsByHabit(Number(id))
    ]).then(([habitData, logsData]) => {
      setHabit(habitData);
      setLogs(logsData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleAddLog = async () => {
    const log = await createLog({
      habitId: Number(id),
      date: new Date().toISOString().split('T')[0],
      completed: true,
      note,
    });
    setLogs(prev => [...prev, log]);
    setNote('');
  };

  const handleDeleteLog = async (logId: number) => {
    await deleteLog(logId);
    setLogs(prev => prev.filter(l => l.id !== logId));
  };

  if (loading) return <p>Завантаження...</p>;
  if (!habit) return <p>Звичку не знайдено. <Link to="/habits">{"<- "}Назад</Link></p>;

  return (
    <div>
      <Link to="/habits">{"<-"} Назад до списку</Link>
      <h1>{habit.name}</h1>
      <p>{habit.description}</p>
      <p><strong>Категорія:</strong> {habit.category}</p>
      <p><strong>Створено:</strong> {habit.createdAt}</p>

      <hr />
      <h3>Записи виконання</h3>

      {/* Форма нового запису */}
      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="Нотатка (необов'язково)"
          value={note}
          onChange={e => setNote(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleAddLog}>✓ Відмітити виконання сьогодні</button>
      </div>

      {/* Список логів */}
      {logs.length === 0 ? (
        <p>Записів ще немає.</p>
      ) : (
        logs.map(log => (
          <div key={log.id} style={{ marginBottom: '8px', padding: '8px', background: '#16171D' }}>
            <span>📅 {log.date}</span>
            <span style={{ marginLeft: '10px' }}>{log.completed ? '✅' : '❌'}</span>
            {log.note && <span style={{ marginLeft: '10px', color: '#555' }}>{log.note}</span>}
            <button
              onClick={() => handleDeleteLog(log.id)}
              style={{ marginLeft: '15px', color: 'red', fontSize: '12px' }}
            >
              Видалити
            </button>
          </div>
        ))
      )}
    </div>
  );
}