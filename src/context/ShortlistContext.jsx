import React, { createContext, useContext, useState } from 'react';

const ShortlistContext = createContext();

export const ShortlistProvider = ({ children }) => {
  const [shortlisted, setShortlisted] = useState([]);

  const addToShortlist = (employee) => {
    setShortlisted((prev) => {
      const exists = prev.find((e) => e.id === employee.id);
      return exists ? prev : [...prev, employee];
    });
  };

  return (
    <ShortlistContext.Provider value={{ shortlisted, addToShortlist }}>
      {children}
    </ShortlistContext.Provider>
  );
};

export const useShortlist = () => useContext(ShortlistContext);
