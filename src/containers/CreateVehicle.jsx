import React, {useRef, useState} from 'react';
import styles from "../styles/CreateVehicle.module.scss";
import NavBar from "../components/NavBar";
import ownerManager from '../model/manager/OwnerManager'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Owner from "../model/entity/Owner";
const verifyUserRoute = 'http://localhost:5000/api/user/add';
const addVehicleRoute = 'http://localhost:5000/api/vehicle/add';

const CreateVehicle = () => {

    const form= useRef(null);
    const navigate = useNavigate();


    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData(form.current);
        const dataUser = {idRol: 2, username: formData.get('placa'), password: formData.get('contrasena')}
        const dataCar = {licensePlate: formData.get('placa'), cc: formData.get('cedula'), movil: formData.get('movil'), model: formData.get('modelo'), brand: formData.get('marca')}
        axios.post(verifyUserRoute, dataUser)
            .then((response) =>{
                axios.post(addVehicleRoute, dataCar).then((res) =>{
                    return  navigate('/validate-owner');
                })
            })
    }
  return (
    <>
      <NavBar />
      <div className={styles.formContainer}>
        <h1>Registrar taxi</h1><br />
        <form onSubmit={handleSubmit}  ref={form}>
          <hr></hr><br />
          <div className={styles.sectionForm}>
            <div className={styles.titleSectionForm}>
              <h2>Propietario</h2>
            </div>
            <div className={styles.contentSectionForm}>
              <div className={styles.inputContainer}>
                <input type="number" className={styles.input} {...register("cedula")} placeholder=" " id="" i defaultValue={ownerManager.owner.cc} />
                <label htmlFor="cedula" className={styles.label}>Cedula</label>
              </div>
              <div className={styles.inputContainer}>
                  <input type="text" className={styles.input} {...register("nombres")} placeholder=" " id="" defaultValue={ownerManager.owner.firstname} />
                  <label htmlFor="nombres" className={styles.label}>Nombres</label>
              </div>
              <div className={styles.inputContainer}>
                  <input type="text" className={styles.input} {...register("apellidos")} placeholder=" " id="" defaultValue={ownerManager.owner.lastname}/>
                  <label htmlFor="apellidos" className={styles.label}>Apellidos</label>
              </div>
            </div>
          </div>
          <br /><hr></hr><br />
          <div className={styles.sectionForm}>
            <div className={styles.titleSectionForm}>
              <h2>Taxi</h2>
            </div>
            <div className={styles.contentSectionForm}>
              <div className={styles.inputContainer}>
                  <input type="text" className={styles.input} {...register("placa" )}placeholder=" " id="" />
                  <label htmlFor="placa" className={styles.label}>Placa</label>
              </div>
              <div className={styles.inputContainer}>
                  <input type="text" className={styles.input} {...register("movil" )}placeholder=" " id="" />
                  <label htmlFor="movil" className={styles.label}>Móvil</label>
              </div>
              <div className={styles.inputContainer}>
                  <input type="text" className={styles.input} {...register("modelo")} placeholder=" " id="" />
                  <label htmlFor="modelo" className={styles.label}>Modelo</label>
              </div>
              <div className={styles.inputContainer}>
                  <input type="text" className={styles.input} {...register("marca" )}placeholder=" " id="" />
                  <label htmlFor="marca" className={styles.label}>Marca</label>
              </div>
            </div>
          </div>
          <br /><hr></hr><br />
          <div className={styles.sectionForm}>
            <div className={styles.titleSectionForm}>
              <h2>Credenciales</h2>
            </div>
            <div className={styles.contentSectionForm}>
              <div className={styles.inputContainer}>
                  <input type="text" className={styles.input} {...register("usuario")} placeholder=" " id="" />
                  <label htmlFor="usuario" className={styles.label}>Usuario</label>
              </div>
              <div className={styles.inputContainer}>
                  <input type="text" className={styles.input} {...register("contrasena")} placeholder=" " id="" />
                  <label htmlFor="contrasena" className={styles.label}>Contrasena</label>
              </div>
            </div>
          </div>
          <br></br>
          <div className={styles.submitBtn}>
            <button onClick={handleSubmit} className={styles.btnSend} type="submit"> Guardar </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateVehicle;
