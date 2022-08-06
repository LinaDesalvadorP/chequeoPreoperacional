import React, { useState, useEffect } from "react";
import Navbar from "./../components/NavBar";
import ChecksTable from "./ChecksTable";
import styles from "./../styles/ChecksListAdmin.module.scss";
import { Modal, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const API_GET_SECTIONS = "http://localhost:5000/api/section/get-all";

const ChecksList = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [sections, setSections] = useState([]);
  useEffect(() => {
    async function fetchSections() {
      const response = await fetch(API_GET_SECTIONS);
      const json = await response.json();
      setSections(json);
    }
    fetchSections();
  }, [setSections]);

  const [sectionSelected, setSectionSelected] = useState("Secciones");
  const sectionHandler = async (sectionSelectedIn) => {
    console.log(sectionSelectedIn)
    setFormState({
      ...formState,
      "section" : sectionSelectedIn
    })
    console.log(formState)
  };

  const [formState, setFormState] = useState({
    section : "",
    statementQuestion : "",
  });

  const handleChange = async (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    setFormState({
      ...formState,
      [e.target.name] : e.target.value
    })
    console.log(formState)
  };

  const enviarDatos = (event) => {
    event.preventDefault()
    console.log('enviando datos...' + formState)
  }

  const ModalContent = () => {
    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Agregar pregunta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group" onSubmit={enviarDatos}>
            <div className={styles.rowModal}>
              <h5>Seleccione la sección: </h5>
              <Dropdown>
                <DropdownButton
                  title={"   " + sectionSelected + "      "}
                  onSelect={sectionHandler}
                >
                  {sections.map((items) => {
                    return (
                      <Dropdown.Item
                        key={items.name}
                        eventKey={items.name}
                      >
                        {items.name}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </Dropdown>
            </div>
            {/* <label htmlFor="statementQuestion">Enunciado de la pregunta</label>
            <input
              className="form-control"
              type="text"
              name="statementQuestion"
              id="statementQuestion"
              onChange={handleChange}
            /> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <Navbar />
      <div className="m-5">
        <h2>Chequeos realizados</h2>
        {/* <button
          className="btn btn-success"
          onClick={() => {
            handleShow();
          }}
        >
          Agregar pregunta
        </button> */}

        <ChecksTable />
        {/* {show ? <ModalContent /> : null} */}
      </div>
    </>
  );
};

export default ChecksList;
