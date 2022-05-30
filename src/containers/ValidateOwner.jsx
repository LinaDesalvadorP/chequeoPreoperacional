import React from 'react';
import NavBar from "../components/NavBar";
import TaxImage from '../../public/assets/images/taxi-frontal.png';
import styles from '../styles/ValidateOwner.module.scss';

const ValidateOwner = () => {
    return (
        <>
            <NavBar />
            <div className={styles['container-owner-form']}>
                <div className={styles["form-container"]}>
                    <div className={styles.headerForm}>
                        <h1>Registrar taxi</h1>
                        <h3>Primero vamos a validar la cédula de propietario</h3>
                    </div>

                    <div className={styles["tax-image-container"]}>
                        <img src= {TaxImage} alt="" />
                    </div>

                    <div className={styles["input-container"]}>
                        <input type="number" className={styles.input} name="Cédula del propietario" placeholder=" " id="" />
                        <label htmlFor="" className={styles.label}>Cédula del propietario</label>
                    </div>

                    <div className={styles["submitBtn"]}>
                        <input type="submit" value="Siguiente" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ValidateOwner;