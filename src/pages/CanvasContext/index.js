import React, { createContext, useContext, useState } from 'react';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const [canvasState, setCanvasState] = useState({
    shapes: [],
    backgroundImage: null,
    boxes: [],
  });

  const contextValue = {
    canvasState,
    setCanvasState,
    // Other functions or values you want to provide
  };
  const updateCanvasState = (newState) => {
    setCanvasState((prev) => ({ ...prev, ...newState }));
  };

  return (
    <CanvasContext.Provider value={contextValue}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};
