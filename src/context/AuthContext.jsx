import { createContext, useState } from "react";

export const AuthContext = createContext({
  id: null,
});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    id: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
