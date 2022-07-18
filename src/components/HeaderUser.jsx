import React from 'react';
import logo from "../../public/assets/images/main_logo_yellow.png";
import styles from "../styles/HeaderUser.module.scss"
import {useNavigate} from "react-router-dom";    

const HeaderUser = () => {
    const navigate = useNavigate();
  const logout = (event) => {
    localStorage.setItem("auth", "no")
    localStorage.setItem("user", "null")
    navigate('/login');
  }

    return (
        <div className={styles.header}>
          <div className={styles["identidad-corp-container"]}>
              <img src={logo} alt="logo de la aplicacion" /> <br></br>
              <h1>
                  <span>CHECK</span>CAR
              </h1>
              <br></br>
          </div>
          <div className={styles.logout}>
              <button className='btn btn-danger' onClick={logout}>Cerrar sesión</button>
          </div>
      </div>
    );
}

export default HeaderUser;