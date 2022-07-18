import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Navbar from "../components/NavBar";

class Users extends Component {
  state = {
    data: [
      {
        rol: "Administrador",
        user: "1002462033",
        name: "Juan",
        lastName: "Perez",
      },
      {
        rol: "Administrador",
        user: "1002462034",
        name: "Maria",
        lastName: "Lopez",
      },
      {
        rol: "Vehiculo",
        user: "ABC-000",
        name: "Camilo",
        lastName: "Perez",
      },
    ],
    modalInsertar: false,
    modalEliminar: false,
    modalSelection: false,
    form: {
      id: "",
      nombre: "",
      pais: "",
      capital_bursatil: "",
      tipoModal: "",
    },
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  modalSelection = () => {
    this.setState({ modalSelection: !this.state.modalSelection });
  };

  validateUser = () => {
    console.log("eligio: ");
  };

  render() {
    const { form } = this.state;
    return (
      <>
        <Navbar />
        <br />
        <br /> <br />
        <button
          className="btn btn-success"
          onClick={() => {
            this.modalSelection();
          }}
        >
          Agregar Usuario
        </button>
        <br />
        <br />
        <table className="table ">
          <thead>
            <tr>
              <th>Rol</th>
              <th>Usuario</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((empresa, index) => {
              return (
                <tr key={index}>
                  <td>{empresa.rol}</td>
                  <td>{empresa.user}</td>
                  <td>{empresa.name}</td>
                  <td>{empresa.lastName}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.seleccionarEmpresa(empresa);
                        this.modalInsertar();
                      }}
                    >
                      <FaIcons.FaEdit />
                    </button>
                    {"   "}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.seleccionarEmpresa(empresa);
                        this.setState({ modalEliminar: true });
                      }}
                    >
                      <FaIcons.FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: "block" }}>
            <span style={{ float: "left" }}>Registrar Taxi</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="rol">Rol</label>
              <input
                className="form-control"
                type="text"
                name="rol"
                id="id"
                readOnly
                onChange={this.handleChange}
                value={form ? form.id : this.state.data.length + 1}
              />
              <br />
              <label htmlFor="user">Usuario</label>
              <input
                className="form-control"
                type="text"
                name="user"
                id="nombre"
                onChange={this.handleChange}
                value={form ? form.nombre : ""}
              />
              <br />
              <label htmlFor="name">Nombres</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="pais"
                onChange={this.handleChange}
                value={form ? form.pais : ""}
              />
              <br />
              <label htmlFor="last_name">Apellidos</label>
              <input
                className="form-control"
                type="text"
                name="last_name"
                id="capital_bursatil"
                onChange={this.handleChange}
                value={form ? form.capital_bursatil : ""}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal == "insertar" ? (
              <button
                className="btn btn-success"
                onClick={() => this.peticionPost()}
              >
                Insertar
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.sendOwnerId()}
              >
                Actualizar
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar a la empresa {form && form.nombre}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => this.peticionDelete()}
            >
              Sí
            </button>
            <button
              className="btn btn-secundary"
              onClick={() => this.setState({ modalEliminar: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
        
        <Modal isOpen={this.state.modalSelection}>
          <ModalHeader>
            <FaIcons.FaUserPlus />
            <span style={{ float: "center" }}>
              Seleccione el tipo de usuario
            </span>
          </ModalHeader>
          <ModalBody>
            <div style={{ marginLeft: "30px" }}>
              <input
                value={"admin"}
                type="radio"
                name={"admin-2"}
                id="flexRadioDefault1"
              />
              <label
                style={{ marginLeft: "12px" }}
                className="form-check-label"
                htmlFor="flexRadioDefault1"
              >
                Administrador
              </label>
              <br />
              <br />
              <input
                className="form-check-input ml-4"
                value={"admin"}
                type="radio"
                name={"admin-2"}
                id="flexRadioDefault1"
              />
              <label
                style={{ marginLeft: "12px" }}
                className="form-check-label"
                htmlFor="flexRadioDefault1"
              >
                Taxi
              </label>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary"
              onClick={() => this.validateUser()}
            >
              Siguiente
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.modalSelection()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Users;
