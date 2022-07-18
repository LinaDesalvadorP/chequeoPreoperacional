import React, { useEffect, useState, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/DailyCheck.module.scss";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Login from './../containers/Login';
import HeaderUser from './../components/HeaderUser';

const API = "http://localhost:5000/api/quiz/get/today-quiz";
const SAVE_CHECK_API = "http://localhost:5000/api/quiz/save";

const DailyCheck = () => {
  /*
   ** Crea un componente de acuerdo al tipo de pregunta
   */
  const findTipo = (itemName, questionType, listaRespuestas) => {
    var respuestas;
    if (listaRespuestas != undefined) {
      respuestas = JSON.parse(listaRespuestas);
    }

    switch (questionType) {
      case "N":
        return (
          <input
            name={itemName}
            type="number"
            className="mb-4 form-control answer-1"
          ></input>
        );
      case "S":
        return (
          <input
            name={itemName}
            type="range"
            className="mb-4 form-range"
            id="customRange1"
          />
        );
      case "SA":
        return (
          <div className="mb-3 col-sm-12 col-lg-8 px-4">
            <div className="row">
              {respuestas?.map((itemRespuesta, index) => (
                <div key={index} className="form-check col-lg-4  col-sm-12">
                  <input
                    className="form-check-input ml-4"
                    value={itemRespuesta.id}
                    type="radio"
                    name={itemName}
                    onSubmit={handleSubmit}
                    id="flexRadioDefault1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    {itemRespuesta.statement}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      case "O":
        return (
          <input
            name={itemName}
            type="text"
            className="mb-4 form-control answer-1"
          ></input>
        );
      case "D":
        return (
          <input
            name={itemName}
            type="date"
            className="mb-4 form-control answer-1"
            
          ></input>
        );
      case "MA":
        respuestasCheckBox = new Array(Object.keys(respuestas).length).fill(
          false
        );
        return (
          <div className="mb-3 col-sm-12 col-lg-8 px-4">
            <div className="row">
              {respuestas?.map((itemRespuesta, index) => (
                <div key={index} className="form-check col-lg-4  col-sm-12">
                  <input
                    className="form-check-input ml-4"
                    value={itemRespuesta.id}
                    type="checkbox"
                    name={itemName}
                    onSubmit={handleSubmit}
                    onChange={() => handleOnChange(index)}
                    id="flexRadioDefault1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    {itemRespuesta.statement}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <h1>No match</h1>;
    }
  };
  /*
   * Verifica cuales son las respuestas seleccionadas en la pregunta de multiples respuestas
   */
  var respuestasCheckBox;
  const handleOnChange = (index) => {
    if (respuestasCheckBox[index] === false) {
      respuestasCheckBox[index] = true;
    } else {
      respuestasCheckBox[index] = false;
    }
    console.log(respuestasCheckBox);
  };

  /*
   * Obtiene las respuestas del fomulario
   */
  const form = useRef(null);
  
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    var respuestas = [];
    questions.forEach((section) =>
      section.questions.forEach((itemQuestion) => {
        if (itemQuestion.type === "MA") {
          var respuestasSeleccionadas = [];
          itemQuestion.answerOptions.forEach((itemAnswer, index) => {
            if (respuestasCheckBox[index] === true) {
              respuestasSeleccionadas.push(itemAnswer.id);
            }
          });
          respuestas.push({
            "idQuestion": itemQuestion.id,
            respuesta: respuestasSeleccionadas,
          });
        } else {
          respuestas.push({
            "idQuestion": itemQuestion.id,
            respuesta: formData.get(itemQuestion.id),
          });
        }
      })
    );
    var chequeoResuelto = [];
    chequeoResuelto.push(localStorage.getItem("user"));
    chequeoResuelto.push(respuestas);
    console.log(chequeoResuelto);

    axios.post(SAVE_CHECK_API, chequeoResuelto).then((response) =>{
      navigate('/successful-registration');
    })
  };

  /*
   *   Carga de datos desde el backend
   */
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch(API);
      const json = await response.json();
      // console.log("**"+JSON.stringify(json));
      setQuestions(json);
    }
    fetchQuestion();
  }, [setQuestions]);

  /*
   * Formulario del chequeo
   */
  const renderChequeo = () =>{
    return (
    <>
      <HeaderUser />
      <div className="row m-1 justify-content-center">
        <div className="row py-4 title text-center">
          <span className="fs-2 fw-bold"> Chequeo preoperacional</span>
          <small>{moment().format("DD-MMM-YYYY hh:mm:ss")}</small>
          <span className="fs-7">Placa: {localStorage.getItem("user")}</span>
        </div>

        <div className="col-lg-8">
          <form action="/" ref={form}>
            {questions?.map((item, index) => (
              <Accordion
                key={index}
                defaultActiveKey="1"
                id="accordionPanelsStayOpenExample"
              >
                <Accordion.Item eventKey="0" className="mb-3">
                  <Accordion.Header className={styles.headerSection}>
                    <img
                      id={styles.imgSection}
                      src={require(`../images/${item?.path}.png`).default}
                    />
                    {item.name}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div>
                      {item.questions.map((pregunta, indexPreg) => (
                        <div key={indexPreg} className="contenedorPregunta">
                          <div>{pregunta.statement}</div>
                          {findTipo(
                            pregunta.id,
                            pregunta.type,
                            JSON.stringify(pregunta.answerOptions)
                          )}
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
          </form>
        </div>
        <div className={styles.submitBtn}>
          <button onClick={handleSubmit}>Guardar</button>
        </div>
      </div>
      </>
    )
  }

  return (
    <>
      { localStorage.getItem("auth") == "yes"
        ? renderChequeo()
        : <Login />
      }
      
    </>
  );
};

export default DailyCheck;
