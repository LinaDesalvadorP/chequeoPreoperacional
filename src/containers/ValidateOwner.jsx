import React, {useRef} from 'react';
import NavBar from "../components/NavBar";
import TaxImage from '../../public/assets/images/taxi-frontal.png';
import styles from '../styles/ValidateOwner.module.scss';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Owner from '../model/entity/Owner'
import ownerManager from '../model/manager/OwnerManager'

const API = 'http://localhost:5000/api/owner/get/';
const qs = require('qs');



const ValidateOwner = () => {
    const form = useRef(null);
    const navigate = useNavigate();


    const sendOwnerId = (event) =>{
        event.preventDefault();
        const formData = new FormData(form.current);
        axios.get(API + formData.get('CC'))
            .then((response) =>{
                const  user = new Owner(response.data.cc, response.data.firstname, response.data.lastname)
                ownerManager.setOwner(user)
                navigate('/create-vehicle');
            })
    }

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
                    <form action="/" className={styles['form-container']} ref={form}>
                        <div className={styles["input-container"]}>
                            <input type="number" className={styles.input} name="CC" placeholder=" " id="" />
                            <label htmlFor="" className={styles.label}>Cédula del propietario</label>
                        </div>

                        <div className={styles["submitBtn"]}>
                            <input type="submit" value="Siguiente" onClick={sendOwnerId} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ValidateOwner;
