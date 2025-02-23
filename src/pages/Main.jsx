import React, { useEffect,useState } from 'react'
import { Box, Container, Grid2 as Grid, Paper, Typography } from '@mui/material'
import { Database, LineChart, Clock, Book } from 'lucide-react'
import { usePage } from '../contexts/PageContext'

const StatCard = ({ icon: Icon, title, description, onClick }) => {
    return (
        <Paper
            elevation={0}
            onClick={onClick}
            sx={{
                boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
                p: 3,
                minHeight: 100,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 2 },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Icon size={24} style={{ color: '#2563EB', marginLeft: 8 }} />
                <Typography variant="h7" component="h3" color="text.primary" fontWeight={600} sx={{ ml: 2 }} fontSize={'1.25rem'}>
                    {title}
                </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </Paper>
    );
};

// Reusable FeatureStat component
const FeatureStat = ({ value, label }) => (
    <Grid xs={12} md={4}>
        <Paper
            elevation={0}
            sx={{
                minHeight: 80,
                minWidth: 250,
                p: 2,
                boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4" sx={{ color: '#2563EB', mb: 1 }} fontWeight={700}>
                {value}
            </Typography>
            <Typography>{label}</Typography>
        </Paper>
    </Grid>
);

function Main() {
    const { setPage } = usePage()
 
    const stats = [
        { icon: Database, title: "מאגר נתונים מרכזי", description: "גישה למאגר הנתונים המקיף של הלמ״ס", onClick: () => setPage('primaryDb') },
        { icon: LineChart, title: "מדדי מחירים", description: "מעקב אחר מדדי המחירים במשק", onClick: () => setPage('primaryDb') },
        { icon: Clock, title: "סדרות עיתיות", description: "נתונים היסטוריים ומגמות לאורך זמן", onClick: () => setPage('primaryDb') },
        { icon: Book, title: 'מילוני למ"ס', description: "מונחים והגדרות בשימוש הלמ״ס", onClick: () => setPage('primaryDb') }
    ];

    const featuredStats = [
        { value: "9.3M", label: "אוכלוסיית ישראל" },
        { value: "3.8%", label: "שיעור האבטלה" },
        { value: "₪11,578", label: "שכר ממוצע במשק" }
    ];

    return (
        <>
            <Box sx={{ backgroundColor: '#2563EB', color: '#fff', py: 6 }}>
                <Container maxWidth={false} disableGutters sx={{ px: 10 }}>
                    <Typography variant="h4" component="h2" gutterBottom fontWeight={700} letterSpacing={1}>
                        נתונים סטטיסטיים מהימנים
                    </Typography>
                    <Typography variant="h6" fontWeight={0} fontSize={'1.25rem'}>
                        גישה מהירה למידע סטטיסטי מקיף ועדכני על מדינת ישראל
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth={false} disableGutters sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
                {/* Stat Cards */}
                <Grid container spacing={3}>
                    {stats.map((stat, index) => (
                        <Grid xs={12} md={6} lg={3} key={index}>
                            <StatCard {...stat} />
                        </Grid>
                    ))}
                </Grid>

                {/* Featured Statistics */}
                <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" gutterBottom fontWeight={700}>
                        נתונים בולטים
                    </Typography>
                    <Grid container spacing={5}>
                        {featuredStats.map((stat, index) => (
                            <FeatureStat key={index} {...stat} />
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default Main;
