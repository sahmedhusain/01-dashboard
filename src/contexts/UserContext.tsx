import React, { createContext, useContext } from 'react';
import { useUser as useUserFromStore } from '../store';
import { User } from '../types';

interface UserContextType {
  user: User | null;
}

const UserContext = createContext<UserContextType>({ user: null });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useUserFromStore();
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
