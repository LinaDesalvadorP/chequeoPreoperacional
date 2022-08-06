import React from 'react';
import carImage from '../../public/assets/images/taxi.png';
import style from '../styles/Welcome.module.scss'
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../components/HeaderUser';

const Welcome = () => {
    const navigate = useNavigate();
    const navigateDailyCheck = () =>{
        navigate('/daily-check');
    }

    return (
        <>
        <HeaderUser />
        <div className={style.container}>
            <div className={style.title}>
                <h1>Bienvenido al sistema de registro mecánico</h1>
            </div>
            <div className={style.leftPanel}>
                <img src={carImage} alt="imagen de taxi" />
                {/* <small>{localStorage.getItem("user")}</small> */}
            </div>
            <div className={style.rightPanel}>
                    <h4>El chequeo pre-operacional hace parte del Plan Estratégico de Seguridad Vial (PESV). La inspección visual del vehículo debe realizarse de manera consciente, evaluando cada elemento que pueda poner en riesgo la seguridad del conductor y sus ocupantes. Es importante, en la medida de lo posible, que estas inspecciones las realice un inspector o una persona que conozca el vehículo, es decir, sus elementos de seguridad activa y pasiva que lo componen.</h4>
                    <h2>Vamos a iniciar ingresando unos datos de su vehículo</h2> <br/>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            navigateDailyCheck();
                        }}
                        >
                        Comencemos!
                    </button>
            </div>
        </div>
        </>
    );
}

export default Welcome;