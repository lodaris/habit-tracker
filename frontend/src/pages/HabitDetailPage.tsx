import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, TextField, Paper, Divider,
  List, ListItem, ListItemText, IconButton, CircularProgress,
  Alert, Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Habit, HabitLog } from '../types';
import { getHabit, getLogsByHabit, createLog, deleteLog, getStats } from '../api/habits';

export default function HabitDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [stats, setStats] = useState<{ total: number; completed: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    Promise.all([
      getHabit(Number(id)),
      getLogsByHabit(Number(id)),
      getStats(Number(id))
    ]).then(([h, l, s]) => {
      setHabit(h); setLogs(l); setStats(s); setLoading(false);
    }).catch(() => { setError('Не вдалося завантажити дані'); setLoading(false); });
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

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress />
    </Box>
  );
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
  if (!habit) return (
    <Alert severity="warning">
      Звичку не знайдено. <Button onClick={() => navigate('/habits')}>← Назад</Button>
    </Alert>
  );

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/habits')} sx={{ mb: 2 }}>
        Назад до списку
      </Button>

      <Paper sx={{ p: 3, mb: 3, border: '1px solid #2a2a2a' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
          {habit.name}
        </Typography>
        {habit.category && (
          <Chip label={habit.category} color="primary" variant="outlined" sx={{ mb: 2 }} />
        )}
        <Typography sx={{ color: 'text.secondary', mb: 1 }}>{habit.description}</Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          Створено: {habit.createdAt}
        </Typography>

        {stats && (
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Paper sx={{ px: 3, py: 2, textAlign: 'center', bgcolor: '#2a2a2a' }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{logs.length}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Всього записів</Typography>
            </Paper>
            <Paper sx={{ px: 3, py: 2, textAlign: 'center', bgcolor: '#2a2a2a' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {logs.filter(l => l.completed).length}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Виконано</Typography>
            </Paper>
          </Box>
        )}
      </Paper>

      <Paper sx={{ p: 3, border: '1px solid #2a2a2a' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Записи виконання</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Нотатка (необов'язково)"
            value={note}
            onChange={e => setNote(e.target.value)}
            size="small"
            fullWidth
          />
          <Button
            variant="contained"
            startIcon={<CheckCircleIcon />}
            onClick={handleAddLog}
            sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Виконано сьогодні
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {logs.length === 0 ? (
          <Typography sx={{ color: 'text.secondary' }}>Записів ще немає.</Typography>
        ) : (
          <List disablePadding>
            {logs.map(log => (
              <ListItem
                key={log.id}
                disablePadding
                sx={{ mb: 1, bgcolor: 'background.default', borderRadius: 1, px: 2 }}
                secondaryAction={
                  <IconButton size="small" color="error" onClick={() => handleDeleteLog(log.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`📅 ${log.date} ${log.completed ? '✅' : '❌'}`}
                  secondary={log.note || undefined}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}