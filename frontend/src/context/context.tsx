import { createContext, useState, useContext } from 'react';

type Props = {
  children: JSX.Element;
};

interface DataContextType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
}

let DataContext = createContext<DataContextType>({} as DataContextType);

export function DataContextProvider({ children }: Props) {
  // State variables
  const [userToken, setUserToken] = useState('');
  const [userId, setUserId] = useState('');

  // Values that will be available in the context
  let value = {
    userToken,
    setUserToken,
    userId,
    setUserId,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
}

