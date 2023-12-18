import { useState, useEffect } from 'react';
import useStore from "./use-store";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const store = useStore();

  useEffect(() => {
    store.actions.auth.token().then(isValidToken => {
      setIsAuthenticated(isValidToken);
    });
  }, [store.state.auth.token]);
  return isAuthenticated;
}

export default useAuth;
