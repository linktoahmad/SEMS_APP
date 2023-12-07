import React, { createContext, useReducer, useContext } from 'react';

// Define your initial state
const initialState = {
  meterId: 'sems000' // Add your shared data here
};

// Create a context
const DataContext = createContext();

// Create a reducer function
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SHARED_DATA':
      return {
        ...state,
        meterId: action.payload
      };
    // Add more cases if needed for other actions
    default:
      return state;
  }
};

// Create a custom hook to use the context and dispatch
export const useDataDispatch = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataDispatch must be used within a DataProvider');
  }
  return context.dispatch;
};

// Create the DataProvider component
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
