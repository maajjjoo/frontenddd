import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

const TEST_USERS = [
  { id: 1, name: 'Free User',       plan: 'FREE'       },
  { id: 2, name: 'Pro User',        plan: 'PRO'        },
  { id: 3, name: 'Enterprise User', plan: 'ENTERPRISE' },
];

export function UserProvider({ children }) {
  const [activeUser, setActiveUser] = useState(TEST_USERS[0]);
  const [quota, setQuota] = useState(null);

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser, TEST_USERS, quota, setQuota }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
