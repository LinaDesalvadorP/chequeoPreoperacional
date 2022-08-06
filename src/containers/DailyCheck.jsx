import React, { useEffect, useState, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/DailyCheck.module.scss";
import moment from "moment";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./../containers/Login";
import HeaderUser from "./../components/HeaderUser";
import { FaInfoCircle, FaSlidersH, FaThumbsUp } from "react-icons/fa";
import SliderComponent from "../components/SliderComponent";

const API_DAILY_QUIZ = "http://localhost:5000/api/quiz/get/today-quiz";
const API_INITIAL_QUIZ = "http://localhost:5000/api/quiz/get/initial-quiz";
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
        return <SliderComponent name={itemName} className="mb-4 form-range" />;
      case "SA":
        return (
          <div className="mb-3 col-sm-12 col-lg-8 px-4">
            <div className="row">
              {respuestas?.map((itemRespuesta, index) => (
                <div key={index} className="form-check col-lg-12  col-sm-12">
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
            idQuestion: itemQuestion.id,
            respuesta: respuestasSeleccionadas,
          // console.log("check: " + JSON.stringify(selected));
          }
          );
        } else {
          respuestas.push({
            idQuestion: itemQuestion.id,
            respuesta: formData.get(itemQuestion.id),
          });
        }
      })
    );
    var chequeoResuelto = [];
    chequeoResuelto.push(localStorage.getItem("user"));
    chequeoResuelto.push(respuestas);
    console.log(chequeoResuelto);

    axios.post(SAVE_CHECK_API, chequeoResuelto).then((response) => {
      navigate("/successful-registration");
    });
  };

  /*
   *   Carga de datos desde el backend
   */
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch(
        localStorage.getItem("typeQuiz") === "Initial quiz"
          ? API_INITIAL_QUIZ
          : API_DAILY_QUIZ
      );
      const json = await response.json();
      console.log(json);
      setQuestions(json);
    }
    fetchQuestion();
  }, [setQuestions]);

  /*
   * Formulario del chequeo
   */
  const renderChequeo = () => {
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
                            <div className="col-lg-12  col-sm-12">
                              {pregunta.statement}
                            </div>

                            {/* Información o recomendacion */}
                            {pregunta.recommendation.type === "R" ? (
                              <div className="col-sm-12 col-lg-12 order-lg-2 order-sm-0 alert alert-warning border-2 rounded-3 mb-3">
                                <div className="row align-items-center justify-content-center  pt-1 pb-1 information-msg">
                                  <div className="col-3">
                                    <div className="text-center">
                                      <FaInfoCircle
                                        className="info-img img-fluid  center-block align-middle"
                                        style={{
                                          color: "#ffc107",
                                          fontSize: "40px",
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-9">
                                    <span>Información</span>
                                    <br></br>
                                    <small>
                                      {pregunta.recommendation.statement}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="col-sm-12 col-lg-12 order-lg-2 order-sm-0 recomendation alert alert-primary border-2 rounded-3 mb-3">
                                <div className="row align-items-center justify-content-center  pt-1 pb-1 information-msg">
                                  <div className="col-3">
                                    <div className="text-center">
                                      <FaThumbsUp
                                        className="info-img img-fluid  center-block align-middle"
                                        style={{
                                          color: "#0d6efd",
                                          fontSize: "40px",
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-9">
                                    <span className="font-weight-bold">
                                      Recomendación
                                    </span>
                                    <br></br>
                                    <small>
                                      {pregunta.recommendation.statement}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            )}
                            {/* Tipo de respuesta */}
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
    );
  };

  return (
    <>{localStorage.getItem("auth") == "yes" ? renderChequeo() : <Login />}</>
  );
};

export default DailyCheck;
