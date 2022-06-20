import React from "react";
import autoBind from "react-autobind";
import "antd/dist/antd.css";
import { Table, Modal } from "antd";
// import AccordionComp from './../components/AccordionComp';
import styles from "../styles/ChecksTable.module.scss";

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
          {/* <AccordionComp/> */}
        </Modal>
      </div>
    );
  }
}

export default ChecksTable;