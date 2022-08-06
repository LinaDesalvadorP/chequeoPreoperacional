import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import Navbar from "./../components/NavBar";

const API_GET_ADMINS = "http://localhost:5000/api/admin/get-all";
const API_POST_BAN = "http://localhost:5000/api/user/ban-user";
const API_POST_UNBAN = "http://localhost:5000/api/user/unban-user";

const API_POST_VERIFY_USER = "http://localhost:5000/api/user/add";
const addAdmin = "http://localhost:5000/api/admin/add";

class CreateAdmin extends Component {
  state = {
    data: [],
    modalInsertar: false,
    form: {
      username: "",
      firstname: "",
      lastname: "",
      isBanned: "",
      password: "",
    },
  };

  loadData = () => {
    axios
      .get(API_GET_ADMINS)
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

  banAdmin(id) {
    axios.post(API_POST_BAN, { username: id }).then((response) => {
      this.loadData();
    });
  }

  unbanAdmin(id) {
    axios.post(API_POST_UNBAN, { username: id }).then((response) => {
      this.loadData();
    });
  }
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  saveAdmin = () => {
    var dataUser = {
      idRol: 4,
      username: this.state.form.username,
      password: this.state.form.password,
    };
    var dataAdmin = {
      username: this.state.form.username,
      firstname: this.state.form.firstname,
      lastname: this.state.form.lastname,
    };
    console.log(dataUser)
    console.log(dataAdmin)
    axios.post(API_POST_VERIFY_USER, dataUser)
    .then((response) => {
        axios.post(addAdmin, dataAdmin)
          .then((response) => {
             this.modalInsertar();
              this.loadData();
          })
          .catch((error) => {
            console.log("2:   " + error.message);
          });
      })
      .catch((error) => {
        console.log("1:  " + error.message);
      });
  };

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
  render() {
    const { form } = this.state;
    return (
      <>
        <Navbar />
        <div className="App" style={{ margin: "0px 5vw" }}>
          <br />
          <h2 style={{textAlign: "center"}}>Administradores</h2>
          <br />
          <button
            className="btn btn-success"
            onClick={() => {
              this.setState({ form: null, tipoModal: "insertar" });
              this.modalInsertar();
            }}
          >
            Agregar administrador
          </button>
          <br />
          <br />
          <table className="table" >
            <thead>
              <tr>
                <th>Cédula</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((administrador, index) => {
                return (
                  <tr key={index}>
                    <td>{administrador.username}</td>
                    <td>{administrador.firstname}</td>
                    <td>{administrador.lastname}</td>
                    <td>
                      {administrador.isBanned == "1" ? (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            this.unbanAdmin(administrador.username);
                          }}
                        >
                          Habilitar
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            this.banAdmin(administrador.username);
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
              <span style={{ float: "left" }}>Agregar administrador</span>
            </ModalHeader>
            <ModalBody>
            <h4>Datos personales</h4>
              <div className="form-group">
                <label htmlFor="username">Cédula</label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  id="username"
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="firstname">Nombres</label>
                <input
                  className="form-control"
                  type="text"
                  name="firstname"
                  id="firstname"
                  onChange={this.handleChange}
                  //   value={form ? form.username : ""}
                />
                <br />
                <label htmlFor="lastname">Apellidos</label>
                <input
                  className="form-control"
                  type="text"
                  name="lastname"
                  id="lastname"
                  onChange={this.handleChange}
                  //   value={form ? form.apellidos : ""}
                />
                <br />
                <h4>Credenciales</h4>
                <label htmlFor="password">Contraseña</label>
                <input
                  className="form-control"
                  type="text"
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                  //   value={form ? form.password : ""}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <button
                className="btn btn-primary"
                onClick={() => this.saveAdmin()}
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
export default CreateAdmin;
