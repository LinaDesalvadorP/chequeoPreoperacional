import React from 'react';
import styles from '../styles/Login.module.scss';
import logo from '../../public/assets/images/main_logo_yellow.png';

const login = () => {
    return (
        <div className={styles.contenedor}>
        <div className={styles['left-panel']}>  
            <div className={styles['identidad-corp-container']}>
                <img src={logo} alt="logo de la aplicacion" />
                <h1><span>CHECK</span>CAR</h1>
                <h3>Transportes Taxi Ya S.A.</h3>
            </div>
        </div>
        <div className={styles['right-panel']}>
            <div className={styles['form-container']}>
                <div className={styles.headerLogin}>
                    <h1>¡Bienvenido!</h1>
                    <h3>Por favor ingrese sus credenciales de acceso para continuar.</h3>
                </div>
                
                <form action="/" className={styles.form}>
                    <div className={styles['input-container']}>
                        <input type="text" className={styles.input} name="Usuario" placeholder=" " id="" />
                        <label htmlFor="" className={styles.label}>Usuario</label>
                    </div>
                    <div className={styles['input-container']}>
                        <input type="password" className={styles.input} name="Contraseña" placeholder=" " id="" />
                        <label htmlFor="" className={styles.label}>Contraseña</label>
                    </div>
                    <div className={styles.submitBtn}>
                        <input type="submit" value="Iniciar sesión" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default login;