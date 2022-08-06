import React, { Component }  from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
const API_GET_SECTIONS = "http://localhost:5000/api/section/get-all";

class ModalCreateQuestion extends Component {
  state = {
    modalInsertar: true,
    sectionsAvailable: [],
    form: {
      section: "",
      statement: "",
    },
  };

  loadSections = () => {
    axios
      .get(API_GET_SECTIONS)
      .then((response) => {
        this.setState({ sectionsAvailable: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  saveQuestion = () => {
    let question = {
      section: this.state.form.section,
      statement: this.state.form.statement,
    };
    console.log(question);
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
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };
  
  render() {
    const { form } = this.state;
    return (
      <>
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
      </>
    );
  }
}
export default ModalCreateQuestion;
