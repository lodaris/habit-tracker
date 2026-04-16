import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import HomePage from './pages/HomePage';
import HabitsPage from './pages/HabitsPage';
import HabitDetailPage from './pages/HabitDetailPage';

function NavBar() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="transparent" elevation={1}
      sx={{ borderBottom: '1px solid #2a2a2a' }}>
      <Toolbar>
      <Typography variant="h6" component="div"
        sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 700 }}
        onClick={() => navigate('/')}>
          🗂️ Трекер звичок
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Головна</Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/habits')}
          sx={{ ml: 1 }}>
          Мої звички
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/habits/:id" element={<HabitDetailPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
