import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from "react-icons/md";

export const SideBar = [
    {
        title: 'Crear Administrador',
        path: '/crear-administrador',
        icon: <FaIcons.FaUserPlus />,
        cName: 'nav-text'
    },
    {
        title: 'Registrar taxi',
        path: '/registrar-vehiculo',
        icon: <MdIcons.MdDirectionsCarFilled />,
        cName: 'nav-text'
    },
    {
        title: 'Ver chequeos',
        path: '/ver-chequeo',
        icon: <FaIcons.FaRegListAlt />,
        cName: 'nav-text'
    }
]

