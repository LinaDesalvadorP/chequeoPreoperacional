import React from 'react';
import logo from "../../public/assets/images/main_logo_yellow.png";
import checkImage from "../../public/assets/images/check.png";
import styles from "../styles/SuccessfulRegistration.module.scss";
import {useNavigate} from "react-router-dom";

const SuccessfulRegistration = () => {
    const navigate = useNavigate();
    const logout = (event) => {
        localStorage.setItem("auth", "no")
        localStorage.setItem("user", "null")
        navigate('/login');
    }
    return (
        <>
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

            <div className={styles.container}>
                <div className={styles.containerCheckImage}>
                    <img src={ checkImage } alt="logo de la aplicacion" />
                </div>
                <div>
                    <h3>El chequeo fue registrado exitosamente</h3>
                </div>
            </div>
        </>
    );
}

export default SuccessfulRegistration;