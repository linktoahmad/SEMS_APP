import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-community/async-storage";

// Create a context
export const DataContext = createContext();

// Create the DataProvider component
const DataProvider = ({ children }) => {
  const [meterId, setMeterId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the user_meterId from AsyncStorage
        const user_meterId = await AsyncStorage.getItem("@save_meterId");

        // If user_meterId is available, set it to the meterId state
        if (user_meterId) {
          setMeterId(user_meterId);
        }
      } catch (error) {
        console.error("Error fetching user_meterId", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <DataContext.Provider value={{ meterId, setMeterId }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
