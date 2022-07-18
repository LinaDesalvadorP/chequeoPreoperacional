import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import Navbar from "./../components/NavBar";

const API_GET_OWNERS = "http://localhost:5000/api/owner/get-all";
const API_ADD_OWNER = "http://localhost:5000/api/owner/add";
const API_UPDATE_OWNER = "http://localhost:5000/api/owner/modify";

class Owners extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      cc: "",
      firstname: "",
      lastname: "",
      tipoModal: ""
    },
  };

  loadData = () => {
    axios
      .get(API_GET_OWNERS)
      .then((response) => {
        console.log(response.data);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  componentDidMount() {
    this.loadData();
  }

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  saveOwner(){
    var dataOwner = {
      cc: this.state.form.cc,
      firstname: this.state.form.firstname,
      lastname: this.state.form.lastname
    };
    axios.post(API_ADD_OWNER, dataOwner)
    .then((response) => {
      console.log(response)
        this.modalInsertar();
        this.loadData();
    })
    .catch((error) => {
      console.log(error.message);
    });
    
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

  selectOwner=(owner)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        cc: owner.cc,
        firstname: owner.firstname,
        lastname: owner.lastname,
      }
    })
  }

  editOwner=()=>{
    const dataOwner = {
      cc: this.state.form.cc,
      firstname: this.state.form.firstname,
      lastname: this.state.form.lastname
    };
    console.log(dataOwner)
    axios.post(API_UPDATE_OWNER, dataOwner)
    .then((response) => {
      console.log(response)
        this.modalInsertar();
        this.loadData();
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
          <h2 style={{textAlign: "center"}}>Propietarios</h2>
          <br />
          <button
            className="btn btn-success"
            onClick={() => {
              this.setState({ form: null, tipoModal: "insertar" });
              this.modalInsertar();
            }}
          >
            Agregar propietario
          </button>
          <br />
          <br />
          <table className="table ">
            <thead>
              <tr>
                <th>Cedula</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((owner, index) => {
                return (
                  <tr key={index}>
                    <td>{owner.cc}</td>
                    <td>{owner.firstname}</td>
                    <td>{owner.lastname}</td>
                    <td>
                    <button className="btn btn-primary" onClick={()=>{this.selectOwner(owner); this.modalInsertar()}}><FaIcons.FaEdit /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{ display: "block" }}>
              <span style={{ float: "left" }}>Agregar propietario</span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="cc">Cédula</label>
                <input
                  className="form-control"
                  type="text"
                  name="cc"
                  id="cc"
                  readOnly = {this.state.tipoModal=='actualizar'?true:false}
                  onChange={this.handleChange}
                  value={form?form.cc: ""}
                />
                <br />
                <label htmlFor="firstname">Nombres</label>
                <input
                  className="form-control"
                  type="text"
                  name="firstname"
                  id="firstname"
                  onChange={this.handleChange}
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
                  value={form ? form.lastname : ""}
                />
                <br />
                
              </div>
            </ModalBody>

            <ModalFooter>
              {this.state.tipoModal=='insertar'
              ?<button className="btn btn-primary"
                onClick={() => this.saveOwner()}>
                  Agregar
                </button>
              :<button className="btn btn-primary"
              onClick={() => this.editOwner()}>
                Actualizar
              </button>

            }
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

export default Owners;
