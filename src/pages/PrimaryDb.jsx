// CatalogToggleView.jsx
import React, { useState, useEffect } from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import CatalogList from '../components/CatalogList';
import { fetchData, transformCatalogData } from '../util';

const CatalogToggleView = ({ onSelect }) => {
  const [viewMode, setViewMode] = useState('tree');
  const [catalogData, setCatalogData] = useState([]);

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setViewMode(nextView);
    }
  };

  useEffect(() => {
    // Fetch root subjects from level endpoint (id=1)
    fetchData({
      url: 'https://apis.cbs.gov.il/series/catalog/level?id=1&format=json&download=false',
      method: 'GET'
    })
      .then((data) => {
        const catalogData = transformCatalogData(data);
        setCatalogData(catalogData);
      })
      .catch((error) => {
        console.error('Failed to fetch catalog data:', error);
      });
  }, []);

  return (
    <Box>
      <CatalogList catalogData={catalogData} onSelect={onSelect} />
    </Box>
  );
};

export default CatalogToggleView;
