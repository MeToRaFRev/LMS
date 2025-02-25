import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Autocomplete,
  CircularProgress,
  Box,
  Alert,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fetchSeriesLevel, fetchSeriesData } from '../apis/api';

function PrimaryDb() {
  const [level1Data, setLevel1Data] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [hierarchyData, setHierarchyData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});

  // Load first-level categories on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSeriesLevel(1);
        const options = data.map((item) => ({
          id: item.path.join(','),
          title: item.name,
          path: item.path,
        }));
        setLevel1Data(data);
        setOptions(options);
      } catch (err) {
        console.error('Failed to load initial data:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Load hierarchy data (levels 2-5) when a category is selected
  const loadHierarchyData = async (category) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedCategory(category);
      setSelectedSeries(null); // clear any previously selected series
      setExpandedNodes({}); // reset expanded nodes on new selection

      const levels = [2, 3, 4, 5];
      let currentSubject = parseInt(category.path[0]);
      let allData = [];

      for (const level of levels) {
        const data = await fetchSeriesLevel(level, currentSubject);
        if (data.length === 0) break;
        allData = [...allData, ...data];
      }
      setHierarchyData(allData);
    } catch (err) {
      console.error('Failed to load hierarchy data:', err);
      setError('Failed to load category details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // When a hierarchy item is clicked, load its series data and set it as the selected series
  const handleSeriesSelect = async (node) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedSeries(node);
      const data = await fetchSeriesData(node.path.join(''));
      setSeriesData(data);
    } catch (err) {
      console.error('Failed to load series data:', err);
      setError('Failed to load series data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Helper: Convert flat hierarchyData into a nested tree structure using the "path" property.
  const buildTree = (data) => {
    const nodesById = {};
    const tree = [];

    data.forEach((item) => {
      const id = item.path.join(',');
      nodesById[id] = { ...item, id, children: [] };
    });

    data.forEach((item) => {
      const id = item.path.join(',');
      if (item.path.length > 1) {
        const parentId = item.path.slice(0, -1).join(',');
        if (nodesById[parentId]) {
          nodesById[parentId].children.push(nodesById[id]);
        } else {
          tree.push(nodesById[id]);
        }
      } else {
        tree.push(nodesById[id]);
      }
    });
    return tree;
  };

  const treeData = buildTree(hierarchyData);

  // Toggle expanded state for a node
  const toggleNode = (id) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Recursive function to render the collapsible list.
  // Clicking the chevron toggles expansion; clicking the title loads series data.
  const renderCollapsibleList = (nodes, level = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedNodes[node.id] || false;
      const isSelected = selectedSeries && selectedSeries.id === node.id;
      return (
        <Box key={node.id} sx={{ pl: level * 2 }}>
          <ListItemButton
            sx={{
              p: 0,
              bgcolor: isSelected ? 'primary.light' : 'transparent',
              borderRadius: 1,
              mb: 0.5,
            }}
            onClick={() => handleSeriesSelect(node)}
          >
            {node.children && node.children.length > 0 && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(node.id);
                }}
                size="small"
              >
                <ChevronDown
                  style={{
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </IconButton>
            )}
            <ListItemText primary={node.name} />
          </ListItemButton>
          {node.children && node.children.length > 0 && isExpanded && (
            <List disablePadding>
              {renderCollapsibleList(node.children, level + 1)}
            </List>
          )}
        </Box>
      );
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', direction: 'rtl' }}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Category Search */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.title || option.name || ''}
            onChange={(event, newValue) => {
              if (newValue) {
                const category = level1Data.find((item) => item.name === newValue.title);
                if (category) loadHierarchyData(category);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} dir="rtl" label="חפש קטגוריה" variant="outlined" />
            )}
          />
        </Paper>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Breadcrumbs */}
        {selectedCategory && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              קטגוריה: {selectedCategory.name}
              {selectedSeries && ` > סדרה: ${selectedSeries.name}`}
            </Typography>
          </Box>
        )}

        {selectedCategory && (
          <Box dir="rtl" sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            {/* Left Column: Collapsible List */}
            <Paper sx={{ p: 2, maxWidth: '30%' }} dir="rtl">
              <Typography variant="h6" gutterBottom>
                תתי נושאים
              </Typography>
              <List disablePadding>{renderCollapsibleList(treeData)}</List>
            </Paper>

            {/* Right Column: Series Area Chart */}
            <Paper sx={{ p: 2, flexGrow: 1, maxHeight: 500 }} dir="rtl">
              <Typography variant="h6" gutterBottom>
                {selectedSeries
                  ? `נתוני הסדרה - ${selectedSeries.name}`
                  : 'בחר סדרה כדי לראות נתוני סדרה'}
              </Typography>
              {seriesData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={seriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="TimePeriod" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Value" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <Typography variant="body2">
                  {selectedSeries
                    ? 'לא נמצאו נתונים עבור הסדרה הנבחרת'
                    : 'בחר סדרה כדי לראות נתוני סדרה'}
                </Typography>
              )}
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default PrimaryDb;
