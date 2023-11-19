
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [id, setId] = useState(() => {
    return localStorage.getItem('sharedId') || null;
  });

  const setSharedId = (newId) => {
    setId(newId);
    localStorage.setItem('sharedId', newId);
  };

  useEffect(() => {
    console.log("Current id after set:", id);
  }, [id]);

  return (
    <DataContext.Provider value={{ id, setSharedId }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
