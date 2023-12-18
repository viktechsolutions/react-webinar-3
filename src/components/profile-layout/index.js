import {memo, useEffect} from "react";
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import './style.css';
import {authService} from "../../store/services/auth-service";


function ProfileLayout() {
  const store = useStore();

  const token = authService.getToken()
  const navigate = useNavigate();
const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      if (window.location.pathname !== '/login') {
        navigate('/login');
      }
    }
  }, [isLoggedIn, navigate]);

  const select = useSelector(state => ({
    name: state.profile.username,
    phone: state.profile.phone,
    email: state.profile.email
  }));

  return (
      <div className="ProfileLayout">
        <h1>Профиль</h1>
        <div className="ProfileLayout__info"> Имя: <b>{select.name}</b> </div>
        <div className="ProfileLayout__info"> Телефон: <b>{select.phone}</b> </div>
        <div className="ProfileLayout__info"> Email: <b>{select.email}</b> </div>
      </div>
  );
}

export default memo(ProfileLayout);
