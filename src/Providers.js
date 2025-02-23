// src/Providers.js
import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { PageProvider } from './contexts/PageContext';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
  

const AppProviders = ({ children }) => (
    <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
            <PageProvider>{children}</PageProvider>
        </ThemeProvider>
    </CacheProvider>
);

export default AppProviders;
