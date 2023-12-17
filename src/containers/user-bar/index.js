import TopBar from "../../components/top-bar";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {memo, useCallback} from "react";
import {useNavigate} from "react-router-dom";

function UserBar() {
  const store = useStore();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const select = useSelector(state => ({ name: state.profile.username }));

  const logout = useCallback(() => {
    store.actions.auth.logout();
    navigate('/');
  }, [store, navigate]);

  return (
    <TopBar isLoggedIn={isLoggedIn} name={select.name} logout={logout}/>
  )
}

export default memo(UserBar);
