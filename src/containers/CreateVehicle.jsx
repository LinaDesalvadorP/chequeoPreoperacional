import React, { useState } from 'react';
import styles from "../styles/CreateVehicle.module.scss";
import NavBar from "../components/NavBar";
import { useForm } from 'react-hook-form';

const CreateVehicle = () => {
  const {register, handleSubmit} = useForm();
  return (
    <>
      <NavBar />
      <div className={styles.formContainer}>
        <h1>Registrar taxi</h1><br />
        <form onSubmit={handleSubmit((data)=>{
          console.log(data)
        })}>
          <hr></hr><br />
          <div className={styles.sectionForm}>
            <div className={styles.titleSectionForm}>
              <h2>Propietario</h2>
            </div>
            <div className={styles.contentSectionForm}>
              <div className={styles.inputContainer}>
                <input type="number" className={styles.input} {...register("cedula")} placeholder=" " id="" /> 
                <label htmlFor="cedula" className={styles.label}>Cedula</label>
              </div>
              <div className={styles.inputContainer}>
                  <input type="text" className={styles.input} {...register("nombres")} placeholder=" " id="" />
                  <label htmlFor="nombres" className={styles.label}>Nombres</label>
              </div>
              <div className={styles.inputContainer}>
                  <input type="text" className={styles.input} {...register("apellidos")} placeholder=" " id="" />
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