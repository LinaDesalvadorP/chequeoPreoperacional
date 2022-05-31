import React, {useRef } from 'react';
import styles from '../styles/Login.module.scss';
import logo from '../../public/assets/images/main_logo_yellow.png';
import axios from 'axios';
import md5 from 'md5';
const API = 'http://localhost:3000/api/login';

const login = () => {
    const form = useRef(null);

    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData(form.current);
        axios({
            method: 'post',
            url: API,
            data:{
                username: formData.get('usuario'),
                password: formData.get('contrasena')
            }
        })
    }
    

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
                
                <form action="/" className={styles.form} ref={form}>
                    <div className={styles['input-container']}>
                        <input type="text" className={styles.input} name="usuario" placeholder=" " id="" />
                        <label htmlFor="usuario" className={styles.label}>Usuario</label>
                    </div>
                    <div className={styles['input-container']}>
                        <input type="password" className={styles.input} name="contrasena" placeholder=" " id="" />
                        <label htmlFor="contrasena" className={styles.label}>Contraseña</label>
                    </div>
                    <div className={styles.submitBtn}>
                        <button
                            onClick={handleSubmit}>
                            Iniciar sesión
                        </button> 
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default login;