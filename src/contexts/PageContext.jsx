import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Default context value for improved intellisense and fallback behavior
const defaultContextValue = {
  page: 'main',
};

const PageContext = createContext(defaultContextValue);

export const usePage = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState('main');
  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};
