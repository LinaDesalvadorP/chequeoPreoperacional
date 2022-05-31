import React, { useState } from 'react';
import styles from "../styles/CreateVehicle.module.scss";
import NavBar from "../components/NavBar";

const CreateVehicle = () => {
  const [todo, setTodo] = useState({
    nombres: '',
    apellidos: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todo);
  }

  const handleChange = (e) =>{
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <>
      <NavBar />
      <div className={styles.formConatiner}>
        <div className="ownerContainer">

        </div>
        <div className="taxContainer">

        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            name="nombres"
            type="text"
            placeholder="Nombres del propietario"
            className="inputForm"
            onChange={handleChange}
            value={todo.name}
            />
          <input
            name="apellidos"
            type="text"
            placeholder="Apellidos del propietario"
            className="inputForm"
            onChange={handleChange}
            value={todo.apellidos}
            />
            <button className="btnSend" type="submit"> Guardar </button>
        </form>
      </div>
    </>
  );
};

export default CreateVehicle;