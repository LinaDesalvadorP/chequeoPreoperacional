import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import Navbar from "./../components/NavBar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AnswerOptions } from "./AnswerOptions";
import styles from "../styles/CreateQuestions.module.scss";
import Autosuggest from "react-autosuggest";

const API_GET_SECTIONS = "http://localhost:5000/api/section/get-all";
const API_GET_QUESTIONS = "http://localhost:5000/api/question/get-all";
const API_GET_ANSWERS = "http://localhost:5000/api/question/get-answers-list";
const API_POST_SAVE_QUESTION = "http://localhost:5000/api/question/add";

const getSuggestionValue = (suggestion) => suggestion.statement;
const renderSuggestion = (suggestion) => <div>{suggestion.statement}</div>;
class CreateQuestions extends Component {
  state = {
    modalInsertar: false,
    questions: [],
    answers: [],
    form: {
      section: " seleccione ",
      statementQuestion: "",
      typeOfAnswerOption: " seleccione ",
      frecuency: 0,
      tipoModal: "",
    },
    sections: [],
    idRecomendation: 0,
    recomendations: [],
    alertTriggers: [],
    value: "",
    suggestions: [],
    optionsAdded: [],
  };

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.answers.filter(
          (lang) =>
            lang.statement.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  loadSections = () => {
    axios
      .get(API_GET_SECTIONS)
      .then((response) => {
        this.setState({ sections: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  loadQuestions = () => {
    axios
      .get(API_GET_QUESTIONS)
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  loadAnswers = () => {
    axios
      .get(API_GET_ANSWERS)
      .then((response) => {
        this.setState({ answers: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log(this.state);
  };

  loadQuestions = () => {
    axios
      .get(API_GET_QUESTIONS)
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  saveQuestion = () => {
    var dataQuestion = {
      section: this.searchIdSection(this.state.form.section),
      statementQuestion: this.state.form.statementQuestion,
      frecuency: this.state.form.frecuency,
      answerType: this.searchDiminutiveType(this.state.form.typeOfAnswerOption),
      alerts: this.state.alertTriggers,
      totalOptions: this.state.optionsAdded,
      recomendations: this.getRecomendations(),
    };

    console.log(dataQuestion);
    //   axios.post(API_POST_SAVE_QUESTION, dataQuestion)
    //   .then((response) => {
    //     console.log(response.data)
    //  })
    //  .catch((error) => {
    //    console.log(error.message);
    //  });
  };

  getRecomendations = () => {
    let recomendationsToSend = [];
    this.state.recomendations.map((recomendation) => {
      recomendationsToSend.push({
        recomendation: recomendation.recomendation,
        type: recomendation.type === "recomendación" ? "R" : "S",
      });
    });
    return recomendationsToSend;
  };
  searchDiminutiveType = (stateType) => {
    switch (stateType) {
      case "Slider":
        return "S";
      case "Fecha":
        return "D";
      case "Abierta numérica":
        return "N";
      case "Única respuesta":
        return "SA";
      case "Múltiple respuesta":
        return "MA";
      case "Abierta texto":
        return "O";
    }
  };

  searchIdAnswer = (answerOption) => {
    const resultado = -1;
    const found = this.state.answers.find(
      (item) => item.statement === answerOption
    );
    return found!=undefined? found.id: resultado ;
  };

  searchIdSection = (sectionName) => {
    const resultado = this.state.sections.find(
      (sections) => sections.name === sectionName
    );
    return resultado.id;
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state);
  };

  handleChangeAlert = async (e) => {
    e.persist();
    await this.setState({
      alertTriggers: {
        ...this.state.alertTriggers,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state);
  };

  handleChangeAlertSA = async (e) => {
    e.persist();
    console.log(e.target.name)
    console.log( e.target.value);
    console.log(this.state.optionsAdded)
  };

  onChangeTriggerOption = (event) => {
    console.log(this.state.optionsAdded) 
    let index = 0;
    const indexOpt = this.state.optionsAdded.some(function(entry, i) {
      if (entry.id == event.target.value) {
          index = i;
          return true;
      }
  });
    this.state.optionsAdded[index] ={
      id: this.state.optionsAdded[index].id,
      option: this.state.optionsAdded[index].option,
      alert: indexOpt,
      alertMessage: this.state.optionsAdded[index].alertMessage
    }
  };
  sectionHandler = (sectionSelected) => {
    this.setState({
      form: {
        ...this.state.form,
        section: sectionSelected,
      },
    });
  };

  handleChangeRec = async (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.state.recomendations[e.target.name] = {
      id: e.target.name,
      recomendation: e.target.value,
      type: this.state.recomendations[e.target.name].type,
    };
    this.setState({
      form: {
        ...this.state.form,
      },
    });
    console.log(this.state);
  };
  recomendationHandler = (recomendationSelected) => {
    const myArray = recomendationSelected.split(",");
    this.state.recomendations[myArray[0]] = {
      id: myArray[0],
      recomendation: this.state.recomendations[myArray[0]].recomendation,
      type: myArray[1],
    };
    this.setState({
      form: {
        ...this.state.form,
      },
    });
  };

  typeOfAnswerOptionsHandler = (answerTypeSelected) => {
    this.setState({
      form: {
        ...this.state.form,
        typeOfAnswerOption: answerTypeSelected,
      },
    });
  };

  addRecomendation = () => {
    this.setState(
      {
        recomendations: [
          ...this.state.recomendations,
          {
            id: this.state.idRecomendation,
            recomendation: "",
            type: "seleccione",
          },
        ],
      },
      () => {
        this.setState({ idRecomendation: this.state.idRecomendation + 1 });
      }
    );
    console.log(this.state);
  };

  addAnswerOption = () => {
    console.log(this.state.value);

    this.setState(
      {
        optionsAdded: [
          ...this.state.optionsAdded,
          {
            id: this.searchIdAnswer(this.state.value),
            option: this.state.value,
            alert: false,
            alertMessage: "",
          },
        ],
      },
      () => {
        this.setState({ value: "" });
      }
    );
  };

  loadSections = () => {
    axios
      .get(API_GET_SECTIONS)
      .then((response) => {
        this.setState({ sections: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.loadQuestions();
    this.loadSections();
    this.loadAnswers();
  }

  selectQuestion = (question) => {
    console.log("editar");
  };

  editOwner = () => {
    console.log("Envía el post ");
  };

  createComponentTypeAnswer = () => {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Ingrese una opción de respuesta",
      value,
      onChange: this.onChange,
    };

    switch (this.state.form.typeOfAnswerOption) {
      case "Abierta numérica":
        return (
          <>
            <hr></hr>
            <label>Alertas</label>
            <br />
            <br />
            <label htmlFor="max">Valor máximo</label>
            <input
              className="form-control"
              type="number"
              name="max"
              id="max"
              onChange={this.handleChangeAlert}
            ></input>

            <label htmlFor="maxAlertMessage">Mensaje de alerta</label>
            <input
              className="form-control"
              type="text"
              name="maxAlertMessage"
              id="maxAlertMessage"
              onChange={this.handleChangeAlert}
            ></input>
          </>
        );
      case "Abierta texto":
        return <></>;
      case "Fecha":
        return (
          <>
            <hr></hr>
            <label>Alertas</label>
            <br></br>
            <label htmlFor="minDate">
              Vigencia máxima en días (si sobrepasa este número genera alerta)
            </label>
            <input
              className="form-control"
              type="number"
              name="minDate"
              id="minDate"
              onChange={this.handleChangeAlert}
            ></input>

            <label htmlFor="minDateMessage">Mensaje de alerta</label>
            <input
              className="form-control"
              type="text"
              name="minAlertMessage"
              id="minAlertMessage"
              onChange={this.handleChangeAlert}
            ></input>
          </>
        );
      case "Slider":
        return (
          <>
            <hr></hr>
            <label>Alertas</label>
            <br></br>
            <label htmlFor="min">Valor mínimo (entre 0 - 100)</label>
            <input
              className="form-control"
              type="number"
              name="min"
              id="min"
              onChange={this.handleChangeAlert}
            ></input>

            <label htmlFor="minDateMessage">Mensaje de alerta</label>
            <input
              className="form-control"
              type="text"
              name="minAlertMessage"
              id="minAlertMessage"
              onChange={this.handleChangeAlert}
            ></input>
          </>
        );
      case "Única respuesta":
        return (
          <>
            <label>Opciones de respuesta</label>
            <div className={styles.formInline}>
              <div className={styles.contentLeft}>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
              </div>
              <Button
                className={styles.contentRight}
                onClick={this.addAnswerOption}
              >
                +
              </Button>
            </div>
            {this.state.optionsAdded?.map((itemRespuesta, index) => (
              <div key={index} className="form-check col-lg-12  col-sm-12">
                <input
                  className="form-check-input ml-4"
                  value={itemRespuesta.id}
                  type="radio"
                  name={itemRespuesta.id}
                  onChange={this.onChangeTriggerOption}
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  {itemRespuesta.option}
                </label>
              </div>
            ))}
            {}
            <small>Seleccione la opción que genera alerta.</small>
            <br />
            <label htmlFor="alertMessage">Mensaje de alerta</label>
            <input
              className="form-control"
              type="text"
              name="alertMessage"
              id="alertMessage"
              onChange={this.handleChangeAlertSA}
            ></input>
          </>
        );
      case "Múltiple respuesta":
        return <h3>Múltiple respuesta</h3>;
      default:
        return <></>;
    }
  };

  render() {
    return (
      <>
        <Navbar />
        <div className="App" style={{ margin: "0px 5vw" }}>
          <br />
          <h2 style={{ textAlign: "center" }}>
            Preguntas del chequeo preoperacional
          </h2>
          <br />
          <button
            className="btn btn-success"
            onClick={() => {
              // this.setState({ form: null, tipoModal: "insertar" });
              this.modalInsertar();
            }}
          >
            Agregar pregunta
          </button>
          <br />
          <br />

          <table className="table ">
            <thead>
              <tr>
                <th>Pregunta</th>
                <th>Tipo</th>
                <th>Frecuencia</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.questions.map((question, index) => {
                return (
                  <tr key={index}>
                    <td>{question.statement}</td>
                    <td>{question.type}</td>
                    <td>{question.frecuency}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.selectQuestion(question);
                          this.modalInsertar();
                        }}
                      >
                        <FaIcons.FaEdit />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{ display: "block" }}>
              <span style={{ float: "left" }}>Agregar pregunta</span>
            </ModalHeader>
            <ModalBody>
              <div className={styles.formInline}>
                <label className={styles.contentLeft}>Sección</label>
                <Dropdown className={styles.contentRight}>
                  <DropdownButton
                    title={"   " + this.state.form.section + "      "}
                    onSelect={this.sectionHandler}
                  >
                    {this.state.sections.map((items) => {
                      return (
                        <Dropdown.Item key={items.name} eventKey={items.name}>
                          {items.name}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                </Dropdown>
              </div>
              <br />
              <label htmlFor="statementQuestion">
                Enunciado de la pregunta
              </label>
              <input
                className="form-control"
                type="text"
                name="statementQuestion"
                id="statementQuestion"
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="frecuency">Frecuencia en días</label>
              <input
                className="form-control"
                type="number"
                name="frecuency"
                id="frecuency"
                onChange={this.handleChange}
              />
              <br />
              <div className={styles.formInline}>
                <label className={styles.contentLeft}>
                  Tipo de opciones de respuesta
                </label>
                <Dropdown className={styles.contentRight}>
                  <DropdownButton
                    title={
                      "   " + this.state.form.typeOfAnswerOption + "      "
                    }
                    onSelect={this.typeOfAnswerOptionsHandler}
                  >
                    {AnswerOptions.map((items) => {
                      return (
                        <Dropdown.Item key={items.type} eventKey={items.type}>
                          {items.type}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                </Dropdown>
              </div>
              {this.createComponentTypeAnswer()}
              <hr></hr>

              {/* Recomendaciones */}
              <div className={styles.formInline}>
                <label className={styles.contentLeft}>Recomendaciones</label>
                <Button
                  className={styles.contentRight}
                  onClick={this.addRecomendation}
                >
                  +
                </Button>
              </div>
              <br />
              <div>
                {this.state.recomendations?.map((items) => {
                  return (
                    <>
                      <div className={styles.formInline}>
                        <input
                          className="form-control"
                          type="text"
                          name={items.id}
                          id={items.id}
                          key={items.id}
                          onChange={this.handleChangeRec}
                        />
                        <Dropdown>
                          <DropdownButton
                            title={
                              "  " + this.state.recomendations[items.id]?.type
                            }
                            onSelect={this.recomendationHandler}
                          >
                            <Dropdown.Item eventKey={items.id + ",información"}>
                              Información
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey={items.id + ",recomendación"}
                            >
                              Recomendación
                            </Dropdown.Item>
                          </DropdownButton>
                        </Dropdown>
                      </div>
                      <br />
                    </>
                  );
                })}
              </div>
            </ModalBody>

            <ModalFooter>
              <button
                className="btn btn-primary"
                onClick={() => this.saveQuestion()}
              >
                Agregar
              </button>

              <button
                className="btn btn-danger"
                onClick={() => this.modalInsertar()}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
}

export default CreateQuestions;
