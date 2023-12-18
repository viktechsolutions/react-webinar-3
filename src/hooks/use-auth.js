import { useState, useEffect } from 'react';
import useStore from "./use-store";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const store = useStore();

  useEffect(() => {
    const token = store.state.auth.token;

    if(token) {
      setIsAuthenticated(true);
      store.actions.auth.updateLoginStatus(isAuthenticated);
    }

  }, [store.state.auth.isLoggedIn]);
  return isAuthenticated;
}

export default useAuth;
