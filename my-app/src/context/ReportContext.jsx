import React, { createContext, useContext, useState, useCallback } from 'react';

const ReportContext = createContext();

export function ReportProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState({ targetType: '', targetId: '' });

  const openReport = useCallback((targetType, targetId) => {
    setTarget({ targetType, targetId });
    setModalOpen(true);
  }, []);

  const closeReport = useCallback(() => {
    setModalOpen(false);
    setTarget({ targetType: '', targetId: '' });
  }, []);

  return (
    <ReportContext.Provider value={{ modalOpen, target, openReport, closeReport }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error('useReport must be used within ReportProvider');
  return ctx;
}