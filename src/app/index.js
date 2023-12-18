import {Routes, Route, Navigate,} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import AuthPage from "./auth-page";
import Profile from "./profile";
import useAuth from "../hooks/use-auth";
import {useEffect, useState} from "react";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const [isToken, setIsToken] = useState(false)
  const isAuth= useAuth();

  useEffect(() => {
    if (isAuth) {
      setIsToken(true);
    }
  }, [isAuth]);

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path="/login" element={!isToken ? <AuthPage /> : <Navigate to="/profile" /> } />
        <Route path="/profile" element={<Profile/>} />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
