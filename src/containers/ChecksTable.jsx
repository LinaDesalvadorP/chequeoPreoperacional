import React, { useState, useEffect } from "react";
import autoBind from "react-autobind";
import "antd/dist/antd.css";
import { Table, Modal } from "antd";
// import AccordionComp from './../components/AccordionComp';
import styles from "../styles/ChecksTable.module.scss";

const GET_QUIZ_LIST_API = "http://localhost:5000/api/quiz/get/quiz-list";

const columns = [
  {
    title: "Movil",
    dataIndex: "movil",
    key: "movil"
  },
  {
    title: "Propietario",
    dataIndex: "propietario",
    key: "propietario"
  },
  {
    title: "Placa",
    dataIndex: "placa",
    key: "placa"
  },
  {
    title: "Fecha",
    dataIndex: "fecha",
    key: "fecha"

  }
];

/*
   *   Carga de datos desde el backend
   */
// const [quizList, setQuizList] = useState([]);
// useEffect(() => {
//   async function fetchQuizList() {
//     const response = await fetch(GET_QUIZ_LIST_API);
//     const json = await response.json();
//     console.log("**"+JSON.stringify(json));
//     setQuizList(json);
//   }
//   fetchQuizList();
// }, [setQuizList]);


const data = [
  {
    key: "1",
    movil: "123",
    propietario: "Camilo Perez",
    placa: "ABC-000",
    fecha: "09/06/2022"
  },
  {
    key: "2",
    movil: "124",
    propietario: "Carlos Lopez",
    placa: "ABC-001",
    fecha: "09/06/2022"
  },
  {
    key: "3",
    movil: "125",
    propietario: "Andres Gomez",
    placa: "ABC-002",
    fecha: "09/06/2022"
  }
];

const getRowKey = record => {
  return `${record.key}`;
};

class ChecksTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
    this.state = { selectedRowKey: null, visible: false };
  }

  setRowKey(record) {
    const selectedRowKey = getRowKey(record);
    console.log(record);
    console.log(selectedRowKey, typeof selectedRowKey);
    this.setState({ selectedRowKey });
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    const { selectedRowKey } = this.state;
    console.log(selectedRowKey, typeof selectedRowKey);

    // const [quizList, setQuizList] = useState([]);
    // useEffect(() => {
    // async function fetchQuizList() {
    //   const response = await fetch(GET_QUIZ_LIST_API);
    //   console.log("4567" + response);
    //   const json = await response.json();
    //   console.log("**"+JSON.stringify(json));
    //   setQuizList(json);
    // }
    // fetchQuizList();
    // }, [setQuizList]);

    return (


      <div className={styles.holder}>
        <Table 
          columns={columns}
          rowKey={record => getRowKey(record)}
          rowClassName={record =>
            getRowKey(record) === selectedRowKey ? "highlighted" : ""
          }
          onRow={record => {
            return {
              onClick: () => {
                this.setState({ visible: true });
                this.setRowKey(record);
              }
            };
          }}
          dataSource={data}
        />

        <Modal
          title="Reporte de chequeo"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <h1>Respuestas</h1>
          {/* <AccordionComp/> */}
        </Modal>
      </div>
    );
  }
}

export default ChecksTable;