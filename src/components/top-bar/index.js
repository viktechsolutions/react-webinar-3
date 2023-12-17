import {memo, useEffect, useState} from "react";
import useStore from "../../hooks/use-store";
import {Link} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import './style.css';

function TopBar(props) {
  return (
    <div className="Topbar">
      {!props.isLoggedIn && (
        <Link to={'/login'}>
          <button> Вход</button>
        </Link>
      )}
      {props.isLoggedIn && (
        <>
          <Link to="/profile" className="Topbar__name">{
            props.name
          }</Link>
            <button onClick={props.logout}>Выход</button>
        </>
      )}
    </div>
  );
}

export default memo(TopBar);
