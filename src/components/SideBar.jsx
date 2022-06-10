import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from "react-icons/md";

export const SideBar = [
    {
        title: 'Crear Administrador',
        path: '/create-admin',
        icon: <FaIcons.FaUserPlus />,
        cName: 'nav-text'
    },
    {
        title: 'Registrar taxi',
        path: '/create-vehicle',
        icon: <MdIcons.MdDirectionsCarFilled />,
        cName: 'nav-text'
    },
    {
        title: 'Ver chequeos',
        path: '/checks-list',
        icon: <FaIcons.FaRegListAlt />,
        cName: 'nav-text'
    }
]

