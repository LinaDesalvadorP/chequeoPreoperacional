import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from "react-icons/md";

export const SideBar = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <FaIcons.FaChartBar />,
        cName: 'nav-text'
    },
    {
        title: 'Administradores',
        path: '/admins',
        icon: <FaIcons.FaUserShield />,
        cName: 'nav-text'
    },
    {
        title: 'Propietarios',
        path: '/owners',
        icon: <FaIcons.FaUserFriends/>,
        cName: 'nav-text'
    },
    {
        title: 'Taxis',
        path: '/taxis',
        icon: <MdIcons.MdDirectionsCarFilled />,
        cName: 'nav-text'
    },
    {
        title: 'Chequeos',
        path: '/checks',
        icon: <FaIcons.FaRegListAlt />,
        cName: 'nav-text'
    },
    {
        title: 'Cerrar sesión',
        path: '/login',
        icon: <FaIcons.FaSignOutAlt />,
        cName: 'nav-text'
    }
]

