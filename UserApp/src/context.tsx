import { createContext, useContext, useEffect, useState } from 'react';
import { SignInPayload } from './graphql/auth/schema';

// Enable `useAppContext` throught the entire application. Example:
// const { signIn, signOut, signedInUser } = useAppContext();

interface AppContextType {
  signIn: (user: SignInPayload) => void;
  signOut: () => void;
  signedInUser: SignInPayload | null;
  refinement: Refinement;
  setRefinement: (refinement: Refinement) => void;
}

export type SortMode = 'date-new'|'date-old'|'price-high'|'price-low';

interface Refinement {
  search: string;
  sort: SortMode;
  filter: any, // eslint-disable-line @typescript-eslint/no-explicit-any
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [signedInUser, setSignedInUser] = useState<SignInPayload | null>(null);

  useEffect(() => {
    const item = localStorage.getItem('user');
    if (item) {
      const user = JSON.parse(item);
      setSignedInUser(user);
    }
  }, []);

  // When the signed in user changes, update the local storage
  useEffect(() => {
    if (signedInUser) {
      signIn(signedInUser);
    }
  }, [signedInUser]);

  function signIn(user: SignInPayload) {
    localStorage.setItem('user', JSON.stringify(user));
    setSignedInUser(user);
  }

  function signOut() {
    localStorage.removeItem('user');
    setSignedInUser(null);
  }

  // Search refinements
  const [refinement, setRefinement] = useState<Refinement>({
    search: '',
    sort: 'date-new',
    filter: {},
  });

  return (
    <AppContext.Provider value={{ signIn, signOut, signedInUser, refinement, setRefinement }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
