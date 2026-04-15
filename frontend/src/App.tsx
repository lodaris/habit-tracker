import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HabitsPage from './pages/HabitsPage';
import HabitDetailPage from './pages/HabitDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '20px' }}>Головна</Link>
        <Link to="/habits">Мої звички</Link>
      </nav>
      <div style={{ padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/habits/:id" element={<HabitDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}