import React, { useState, useEffect } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button } from "react-bootstrap";
import AccordionAnswered from "./AccordionAnswered"

const API = "http://localhost:5000/api/quiz/get/quiz-list";
const API_GET_SECTIONS = "http://localhost:5000/api/section/get-all";

const ChecksTable = () => {
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch(API);
      const json = await response.json();
      setQuestions(json);
    }
    fetchQuestion();
  }, [setQuestions]);

  const columns = [
    {dataField: "movil", text:"Movil"},
    {dataField: "name", text:"Propietario"},
    {dataField: "license_plate", text:"Placa"},
    {dataField: "presentation", text:"Fecha"}
  ];

  const getQuizById = (id) =>{
    const [quizSolved, setQuizSolved] = useState([]);
    useEffect(() => {
      async function fetchQuizById() {
        const response = await fetch("http://localhost:5000/api/quiz/get-quiz/"+{id});
        const json = await response.json();
        console.log("**"+JSON.stringify(json));
        setQuizSolved(json);
      }
      fetchQuizById();
    }, [setQuizSolved]);
  }

  const rowEvents = {
    onClick: (e, row) =>{
      setModalInfo(JSON.parse(JSON.stringify(row)).id)
      toggleTrueFalse()
    }
  }

  const toggleTrueFalse = () =>{
    setShowModal(handleShow);
  }
  const ModalContent = () =>{
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Reporte de chequeo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AccordionAnswered id={modalInfo} />
        </Modal.Body> 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <>
      <BootstrapTable
        keyField='id'
        data={questions}
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
      />
      {show ? <ModalContent/>: null}
    </>
  );
}

export default ChecksTable;