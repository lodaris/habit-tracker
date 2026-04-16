import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Button, Typography, Box, CircularProgress,
  Alert, Chip, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import type { Habit } from '../types';
import { getHabits, createHabit, deleteHabit, updateHabit } from '../api/habits';

export default function HabitsPage() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [formError, setFormError] = useState('');
  const [editHabit, setEditHabit] = useState<Habit | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');

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
      setName(''); setDescription(''); setCategory(''); setFormError('');
    } catch { setFormError('Помилка при створенні'); }
  };

  const handleDelete = async (id: number) => {
    await deleteHabit(id);
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const openEdit = (habit: Habit) => {
    setEditHabit(habit);
    setEditName(habit.name);
    setEditDescription(habit.description);
    setEditCategory(habit.category);
  };

  const handleEdit = async () => {
    if (!editHabit) return;
    const updated = await updateHabit(editHabit.id, {
      name: editName, description: editDescription, category: editCategory
    });
    setHabits(prev => prev.map(h => h.id === updated.id ? updated : h));
    setEditHabit(null);
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress />
    </Box>
  );

  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Мої звички</Typography>

      {/* Форма додавання */}
      <Box sx={{ p: 3, mb: 4, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid #2a2a2a' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Додати звичку</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Назва *"
            value={name}
            onChange={e => setName(e.target.value)}
            size="small"
            error={!!formError}
            helperText={formError}
            sx={{ minWidth: 200 }}
          />
          <TextField
            label="Опис"
            value={description}
            onChange={e => setDescription(e.target.value)}
            size="small"
            sx={{ minWidth: 200 }}
          />
          <TextField
            label="Категорія"
            value={category}
            onChange={e => setCategory(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
            Додати
          </Button>
        </Box>
      </Box>

      {/* Список */}
      {habits.length === 0 ? (
        <Typography sx={{ color: 'text.secondary' }}>
          Звичок ще немає, додай першу.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {habits.map(habit => (
            <Box key={habit.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
              <Card sx={{ height: '100%', border: '1px solid #2a2a2a' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{habit.name}</Typography>
                  {habit.category && (
                    <Chip
                      label={habit.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  )}
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {habit.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 1 }}>
                    Створено: {habit.createdAt}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate(`/habits/${habit.id}`)}>
                    Деталі
                  </Button>
                  <IconButton size="small" onClick={() => openEdit(habit)} sx={{ ml: 'auto' }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(habit.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* Модальне вікно редагування */}
      <Dialog open={!!editHabit} onClose={() => setEditHabit(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Редагувати звичку</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Назва"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Опис"
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            fullWidth
          />
          <TextField
            label="Категорія"
            value={editCategory}
            onChange={e => setEditCategory(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditHabit(null)}>Скасувати</Button>
          <Button variant="contained" onClick={handleEdit}>Зберегти</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}