import {memo, useEffect} from "react";
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import './style.css';

function ProfileLayout() {
  const store = useStore();

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    store.actions.profile.profile();
  }, []);

  const select = useSelector(state => ({
    name: state.profile.username,
    phone: state.profile.phone,
    email: state.profile.email
  }));

  useEffect(() => {
    if (token) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  }, [token]);

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