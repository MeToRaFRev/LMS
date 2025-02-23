// CatalogItem.jsx
import React, { useState } from 'react';
import { List, ListItemButton, ListItemText, Collapse, Skeleton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { fetchSubCatalogData } from '../util';

const CatalogItem = ({ item, level }) => {
  const [open, setOpen] = useState(false);
  const [subCatalogData, setSubCatalogData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleItemClick = () => {
    if (subCatalogData !== null) {
      setOpen(!open);
      return;
    }
    setOpen(true);
    setLoading(true);
    // Use the path-based API to fetch subcatalog data
    fetchSubCatalogData(item.id)
      .then((data) => {
        setSubCatalogData(data);
      })
      .catch((error) => {
        console.error('Failed to fetch subcatalog data:', error);
        setSubCatalogData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <ListItemButton
        onClick={handleItemClick}
        sx={{
          backgroundColor: level % 2 ? 'white' : 'grey.50',
          '&:hover': { backgroundColor: 'grey.100' },
          borderBottom: '1px solid',
          borderColor: 'grey.300',
          mb: 0.5,
          borderRadius: 1,
        }}
      >
        <ListItemText primary={item.name} secondary={`מזהה: ${item.id}`} />
        {subCatalogData && subCatalogData.length > 0
          ? (open ? <ExpandLess /> : <ExpandMore />)
          : null}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={60} />
        ) : (
          subCatalogData && subCatalogData.length > 0 && (
            <List component="div" disablePadding>
              {subCatalogData.map((subItem) => (
                <CatalogItem key={subItem.id} item={subItem} level={level + 1} />
              ))}
            </List>
          )
        )}
      </Collapse>
    </>
  );
};

export default CatalogItem;
