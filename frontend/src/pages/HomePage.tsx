import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center', mt: 12 }}>
      <Typography variant="h2" sx={{ fontWeight: 700 }} gutterBottom>
        Трекер звичок 🗂️
      </Typography>
      <Typography variant="h6" sx={{ color: 'text.secondary', mb: 5 }}>
        Відстежуй свої звички щодня та досягай цілей.
      </Typography>
      <Button variant="contained" size="large" onClick={() => navigate('/habits')}
        sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}>
        Розпочати -{">"}
      </Button>
    </Box>
  );
}