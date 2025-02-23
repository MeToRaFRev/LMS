// CatalogList.jsx
import React from 'react';
import { List, Paper, Typography } from '@mui/material';
import CatalogItem from './CatalogItem';

const CatalogList = ({ catalogData }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        נושאי סדרות (רמה 1)
      </Typography>
      <List dir="rtl" dense>
        {catalogData.map((item) => (
          <CatalogItem key={item.id} item={item} level={1} />
        ))}
      </List>
    </Paper>
  );
};

export default CatalogList;
