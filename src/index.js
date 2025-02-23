// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import AppProviders from './Providers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
