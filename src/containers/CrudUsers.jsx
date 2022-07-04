import React from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const API = '';

const columns = [
    {
      title: "Rol",
      dataIndex: "rol",
      key: "rol"
    },
    {
      title: "Cédula",
      dataIndex: "cedula",
      key: "cedula"
    },
    {
      title: "Nombres",
      dataIndex: "nombres",
      key: "nombres"
    },
    {
      title: "Apellidos",
      dataIndex: "apellidos",
      key: "apellidos"
  
    }
  ];

const CrudUsers = () => {
    return (
        <>
            <button>Agregar usuario</button>
            <br/>
            
        </>
    );
}

export default CrudUsers;
