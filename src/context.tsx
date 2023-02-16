import { createContext, useContext, useEffect, useState } from "react";
import { SignInPayload } from "./graphql/auth/schema";

interface AppContextType {
  signIn: (user: SignInPayload) => void;
  signOut: () => void;
  signedInUser: SignInPayload | null;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [signedInUser, setSignedInUser] = useState<SignInPayload|null>(null);

  useEffect(() => {
    const item = localStorage.getItem('user')
    if (item) {
      const user = JSON.parse(item);
      setSignedInUser(user);
    }
  }, [])

  function signIn(user: SignInPayload) {
    localStorage.setItem('user', JSON.stringify(user));
    setSignedInUser(user);

  }

  function signOut() {
    localStorage.removeItem('user');
    setSignedInUser(null);
  }

  return (
    <AppContext.Provider value={{ signIn, signOut, signedInUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
