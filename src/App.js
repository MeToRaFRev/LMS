// src/App.js
import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Grid2 as Grid,
} from '@mui/material';
import { Database } from 'lucide-react';
import Main from './pages/Main';
import PrimaryDb from './pages/PrimaryDb';
import { usePage } from './contexts/PageContext';

function App() {
  // usePage is now safe to use because PageProvider is wrapping App in index.js
  const { page, setPage } = usePage();

  return (
    <Box dir="rtl" sx={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      {/* Header */}
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          height: '10vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth={false} disableGutters sx={{ p: 10 }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Database size={32} style={{ color: '#2563EB', marginLeft: 12 }} />
              <Typography
                variant="h5"
                component="h1"
                color="text.primary"
                fontWeight={700}
                sx={{ ml: 2 }}
              >
                הלשכה המרכזית לסטטיסטיקה
              </Typography>
            </Box>
            <Box component="nav">
              <Typography
                component="a"
                href="#"
                onClick={() => setPage('main')}
                sx={{ color: 'text.secondary', textDecoration: 'none', mx: 2 }}
              >
                ראשי
              </Typography>
              <Typography
                component="a"
                href="#"
                onClick={() => setPage('primaryDb')}
                sx={{ color: 'text.secondary', textDecoration: 'none', mx: 2 }}
              >
                אודות
              </Typography>
              <Typography
                component="a"
                href="#"
                onClick={() => setPage('about')}
                sx={{ color: 'text.secondary', textDecoration: 'none', mx: 2 }}
              >
                צור קשר
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {page === 'main' ? (
        <Main />
      ) : page === 'primaryDb' ? (
        <PrimaryDb />
      ) : page === 'about' ? (
        // Replace with your About component when ready
        null
      ) : page === 'contact' ? (
        // Replace with your Contact component when ready
        null
      ) : null}

      {/* Footer */}
      <Box sx={{ backgroundColor: '#1F2937', color: '#9CA3AF', mt: 8, py: 4 }}>
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 4,
          }}
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                הלשכה המרכזית לסטטיסטיקה
              </Typography>
              <Typography>רח׳ כנפי נשרים 66</Typography>
              <Typography>ירושלים 95464</Typography>
            </Grid>
            <Grid xs={12} md={4}>
              <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                שעות פעילות
              </Typography>
              <Typography>ימים א׳-ה׳: 8:00-16:00</Typography>
              <Typography>יום ו׳: סגור</Typography>
            </Grid>
            <Grid xs={12} md={4}>
              <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                צור קשר
              </Typography>
              <Typography>טלפון: 02-6592666</Typography>
              <Typography>פקס: 02-6592703</Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderTop: '1px solid #374151',
              mt: 4,
              pt: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2">
              © {new Date().getFullYear()} ערוץ המעריצים של הלשכה המרכזית לסטטיסטיקה.
              כל הזכויות שמורות.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
