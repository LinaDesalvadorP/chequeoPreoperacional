import React, { useRef } from "react";
import styles from "../styles/Login.module.scss";
import logo from "../../public/assets/images/main_logo_yellow.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = "http://localhost:5000/api/user/login";
const API_VALIDATE_TYPE_DAILY_CHECK = "http://localhost:5000/api/quiz/get/quiz-type/";

const login = () => {
  localStorage.setItem("auth", "no");
  localStorage.setItem("user", "null");

  const form = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    axios({
      method: "post",
      url: API,
      data: {
        username: formData.get("usuario"),
        password: formData.get("contrasena"),
      },
    })
      .then((response) => {
        localStorage.setItem("auth", "yes");
        localStorage.setItem("user", formData.get("usuario"));
        if (response.data.rol === "administator") {
          navigate("/dashboard");
        } else if (response.data.rol === "driver") {
          axios
            .get(API_VALIDATE_TYPE_DAILY_CHECK + formData.get("usuario"))
            .then((response) => {
              response.data.message === "Initial quiz"
                ? navigate("/welcome")  
                : navigate("/daily-check");
                localStorage.setItem("typeQuiz", response.data.message);
            })
            .catch((error) => {
              console.log(error.response.data.message);
            });
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles["left-panel"]}>
        <div className={styles["identidad-corp-container"]}>
          <img src={logo} alt="logo de la aplicacion" /> <br></br>
          <br></br>
          <h1>
            <span>CHECK</span>CAR
          </h1>
          <br></br>
          <h3>Transportes Taxi Ya S.A.</h3>
        </div>
      </div>
      <div className={styles["right-panel"]}>
        <div className={styles["form-container"]}>
          <div className={styles.headerLogin}>
            <h1>¡Bienvenido!</h1>
            <h3>
              Por favor ingrese sus credenciales de acceso para continuar.
            </h3>
          </div>

          <form action="/" className={styles.form} ref={form}>
            <div className={styles["input-container"]}>
              <input
                type="text"
                className={styles.input}
                name="usuario"
                placeholder=" "
                id="usuario"
              />
              <label htmlFor="usuario" className={styles.label}>
                Usuario
              </label>
            </div>
            <div className={styles["input-container"]}>
              <input
                type="password"
                className={styles.input}
                name="contrasena"
                placeholder=" "
                id="contrasena"
              />
              <label htmlFor="contrasena" className={styles.label}>
                Contraseña
              </label>
            </div>
            <div className={styles.submitBtn}>
              <button onClick={handleSubmit}>Iniciar sesión</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
