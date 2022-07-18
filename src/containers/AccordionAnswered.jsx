import React, {useState, useEffect} from 'react';
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/AccordionAnswered.module.scss";

const AccordionAnswered = (props) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch("http://localhost:5000/api/quiz/get-quiz/"+props.id);
      const json = await response.json();
      console.log("**"+JSON.stringify(json));
      setQuestions(json);
    }
    fetchQuestion();
  }, [setQuestions]);


  const findTipo = (itemName, questionType, listaRespuestas, solvedOpenAnswer) => {
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
            placeholder={solvedOpenAnswer.statement}
            readOnly= "true"
          ></input>
        );
      case "S":
        return (
          <input
            name={itemName}
            type="range"
            className="mb-4 form-range"
            id="customRange1"
            readOnly= "true"
            value= {solvedOpenAnswer.statement}
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
                    id="flexRadioDefault1"
                    checked= {itemRespuesta.selected}
                    readOnly= "true"
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
            placeholder={solvedOpenAnswer.statement}
            readOnly= "true"
            ></input>
            );
      case "D":
        return (
          <input
          name={itemName}
          type="date"
          className="mb-4 form-control answer-1"
          placeholder={solvedOpenAnswer.statement}
          value={solvedOpenAnswer.statement}
          readOnly= "true"
          ></input>
        );
      case "MA":
        return (
          <div className="mb-3 col-sm-12 col-lg-8 px-4">
            <div className="row">
              {respuestas?.map((itemRespuesta, index) => (
                <div key={index} className="form-check col-lg-6  col-sm-4">
                  <input
                    className="form-check-input ml-4"
                    value={itemRespuesta.id}
                    type="checkbox"
                    name={itemName}
                    id="flexRadioDefault1"
                    checked= {itemRespuesta.selected}
                    readOnly = "true"
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

    return (
        <>
            {questions?.map((item, index) => (
              <Accordion
                key={index}
                defaultActiveKey="1"
                id="accordionPanelsStayOpenExample"
              >
                <Accordion.Item eventKey="0" className="mb-3">
                  <Accordion.Header>
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
                            JSON.stringify(pregunta.answerOptions),
                            pregunta.solvedOpenAnswer
                          )}
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
        </>
    );
}

export default AccordionAnswered;