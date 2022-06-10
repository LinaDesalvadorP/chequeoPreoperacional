import React from 'react';
import styles from "../styles/CreateAdmin.module.scss";
// import styles from "../styles/CreateAdmnin.module.scss";
import NavBar from "../components/NavBar";

const CreateAdmin = () => {
    const handleSubmit = (event) =>{}
    return (
        <>
            <NavBar/>
            <div className={styles.formContainer}>
                <h1>Registrar administrador</h1>
                <form onSubmit={handleSubmit}>
                    <hr></hr>
                    <div className={styles.sectionForm}>
                        <div className={styles.titleSectionForm}>
                        <h2>Datos personales</h2>
                        </div>
                        <div className={styles.contentSectionForm}>
                        <div className={styles.inputContainer}>
                            <input type="number" className={styles.input} name="cedula" placeholder=" " id="" />
                            <label htmlFor="cedula" className={styles.label}>Cedula</label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="text" className={styles.input} name="nombres" placeholder=" " id="" />
                            <label htmlFor="nombres" className={styles.label}>Nombres</label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="text" className={styles.input} name="apellidos" placeholder=" " id="" />
                            <label htmlFor="apellidos" className={styles.label}>Apellidos</label>
                        </div>
                        </div>
                    </div> 

                    <hr></hr>
                    <div className={styles.sectionForm}>
                        <div className={styles.titleSectionForm}>
                        <h2>Credenciales</h2>
                        </div>
                        <div className={styles.contentSectionForm}>
                        <div className={styles.inputContainer}>
                            <input type="text" className={styles.input} name="usuario" placeholder=" " id="" />
                            <label htmlFor="usuario" className={styles.label}>Usuario</label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="text" className={styles.input} name="contrasena" placeholder=" " id="" />
                            <label htmlFor="contrasena" className={styles.label}>Contrasena</label>
                        </div>
                        </div>
                    </div>
                    <br></br>

                    <div className={styles.submitBtn}>
                        <button className={styles.btnSend} type="submit"> Guardar </button>
                    </div>
                </form> 
            </div> 
        </>
    );
}

export default CreateAdmin;