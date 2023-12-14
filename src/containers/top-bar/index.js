import {memo} from "react";
import useStore from "../../hooks/use-store";
import {Link} from "react-router-dom";

/**
 * Контейнер с компонентами навигации
 */
function TopBar() {
  const store = useStore();
const auth=store.actions.auth
  const handleLogout = () => {
    store.actions.auth.logout();
    localStorage.removeItem('token');
  };

  return (
 <>
      <Link to={'/login'}><button> Вход </button></Link>
      {auth.isLoggedIn && (
        <>
          <Link to="/profile">user add name</Link>
          <button onClick={handleLogout}>Выход</button>
        </>
      )
      }
  </>
  );
}

export default memo(TopBar);
