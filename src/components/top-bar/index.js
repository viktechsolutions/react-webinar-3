import {memo, useEffect} from "react";
import useStore from "../../hooks/use-store";
import {Link} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import './style.css';

/**
 * Контейнер с компонентами навигации
 */
function TopBar() {
  const store = useStore();
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    store.actions.profile.profile();
  }, []);

  const select = useSelector(state => ({
    name: state.profile.username
  }));

  return (
    <div className="Topbar">
      {!isLoggedIn && (
        <Link to={'/login'}>
          <button> Вход</button>
        </Link>
      )}
      {isLoggedIn && (
        <>
          <Link to="/profile" className="Topbar__name">{
            select.name
          }</Link>
          <button onClick={() => store.actions.auth.logout()}>Выход</button>
        </>
      )}
    </div>
  );
}

export default memo(TopBar);
