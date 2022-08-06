import React, { Component } from "react";
import axios from "axios";
import Navbar from "./../components/NavBar";
import * as FaIcons from "react-icons/fa";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const API_GET_TAXIS = "http://localhost:5000/api/vehicle/get-all";
const API_GET_OWNER = "http://localhost:5000/api/owner/get/";
const API_POST_USER = 'http://localhost:5000/api/user/add';
const API_ADD_TAXI = "http://localhost:5000/api/vehicle/add";
const API_UPDATE_TAXI = "http://localhost:5000/api/modify";


class Taxis extends Component {
  state = {
    data: [],
    modalValidateOwner: false,
    modalInsertar: false,
    form:{
      licensePlate: "",
      cc: "",
      firstname: "",
      lastname: "",
      movil: "",
      model: "",
      brand: "",
      password: "",
      isBanned: "",
      tipoModal: "",
    },
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  modalValidateOwner = () => {
    this.setState({ modalValidateOwner: !this.state.modalValidateOwner });
  };

  loadData = () => {
    axios
      .get(API_GET_TAXIS)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.loadData();
  }

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  validateCCOwner() {
    axios
      .get(API_GET_OWNER + this.state.form.cc)
      .then((response) => {
        console.log(response.data);

        this.setState({form: {
          cc: response.data.cc,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          tipoModal: "insertar",
        }
        });
        console.log("nombre" + response.data.firstname)
        console.log(this.state.form)
        console.log("apellidos " + response.data.lastname)
        this.modalValidateOwner();
        this.modalInsertar();
      })
      .catch((response) => {
        console.log(response.response.data);
      });
  }

  saveTaxi(){
    var dataUserTaxi = {
      idRol: 14,
      username: this.state.form.licensePlate,
      password: this.state.form.password
    };
    var dataTaxi = {
      licensePlate: this.state.form.licensePlate,
      cc: this.state.form.cc,
      movil: this.state.form.movil,
      model: this.state.form.model,
      brand: this.state.form.brand
    }


    axios.post(API_POST_USER, dataUserTaxi)
    .then((response) => {
      // console.log(response)
        axios.post(API_ADD_TAXI, dataTaxi)
        .then((response)=>{
          console.log(response)
          this.modalInsertar();
          this.loadData();
        })
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  render() {
    const { form } = this.state;
    return (
      <>
        <Navbar />
        <div className="App" style={{ margin: "0px 5vw" }}>
          <br />
          <h2 style={{ textAlign: "center" }}>Taxis afiliados</h2>
          <br />
          <button
            className="btn btn-success"
            onClick={() => {
              // this.setState({ form: null, tipoModal: "insertar" });
              this.modalValidateOwner();
            }}
          >
            Agregar taxi
          </button>
          <br />
          <br />
          <table className="table ">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Cédula del propietario</th>
                <th>Móvil</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((taxi, index) => {
                return (
                  <tr key={index}>
                    <td>{taxi.licensePlate}</td>
                    <td>{taxi.cc}</td>
                    <td>{taxi.movil}</td>
                    <td>
                      {taxi.isBanned == "true" ? (
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            this.unbanAdmin(taxi.username);
                          }}
                        >
                          Habilitar
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            this.banAdmin(taxi.username);
                          }}
                        >
                          Bloquear
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{ display: "block" }}>
              <span style={{ float: "left" }}>Agregar taxi</span>
            </ModalHeader>
            <ModalBody>
              <h4>Propietario</h4>
              <div className="form-group">
                <label htmlFor="cc">Cédula</label>
                <input
                  className="form-control"
                  type="text"
                  name="cc"
                  id="cc"
                  onChange={this.handleChange}
                  readOnly
                  value={form ? form.cc : ""}
                />
                <br />
                <label htmlFor="firstname">Nombres</label>
                <input
                  className="form-control"
                  type="text"
                  name="firstname"
                  id="firstname"
                  onChange={this.handleChange}
                  readOnly
                  value={form ? form.firstname : ""}
                />
                <br />
                <label htmlFor="lastname">Apellidos</label>
                <input
                  className="form-control"
                  type="text"
                  name="lastname"
                  id="lastname"
                  onChange={this.handleChange}
                  readOnly
                  value={form ? form.lastname : "j"}
                />
                <br />
                <h4>Datos del taxi</h4>
                <label htmlFor="licensePlate">Placa</label>
                <input
                  className="form-control"
                  type="text"
                  name="licensePlate"
                  id="licensePlate"
                  onChange={this.handleChange}
                  value={form ? form.licensePlate : ""}
                />

                <label htmlFor="movil">Móvil</label>
                <input
                  className="form-control"
                  type="number"
                  name="movil"
                  id="movil"
                  onChange={this.handleChange}
                  value={form ? form.movil : ""}
                />

                <label htmlFor="model">Modelo</label>
                <input
                  className="form-control"
                  type="number"
                  name="model"
                  id="model"
                  onChange={this.handleChange}
                  value={form ? form.model : ""}
                />

                <label htmlFor="brand">Marca</label>
                <input
                  className="form-control"
                  type="text"
                  name="brand"
                  id="brand"
                  onChange={this.handleChange}
                  value={form ? form.brand : ""}
                />

                <h4>Credenciales</h4>
                <label htmlFor="password">Contraseña</label>
                <input
                  className="form-control"
                  type="text"
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                  value={form ? form.password : ""}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <button
                className="btn btn-primary"
                onClick={() => this.saveTaxi()}
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

          <Modal isOpen={this.state.modalValidateOwner}>
            <ModalHeader>
              <span>Registrar taxi</span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="cc">Cédula del propietario</label>
                <input
                  type="number"
                  className="form-control"
                  name="cc"
                  placeholder=" "
                  id=""
                  onChange={this.handleChange}
                />
                {/* <small>Error</small> */}
              </div>

            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-primary"
                onClick={() => this.validateCCOwner()}
              >
                Siguiente
              </button>

              <button
                className="btn btn-danger"
                onClick={() => this.modalValidateOwner()}
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

export default Taxis;
