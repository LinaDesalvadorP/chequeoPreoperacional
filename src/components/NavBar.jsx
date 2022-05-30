import React, {useState} from 'react';
import '../styles/NavBar.scss';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SideBar } from './SideBar';
import { IconContext } from 'react-icons';

const NavBar = () => {
    const [sidebar,setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <IconContext.Provider value={{color:'#0077B6'}}>
                <div className='navBar'>
                    <Link to="#" className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to="#" className='menu-bars'>
                                <FaIcons.FaAngleLeft />
                            </Link>
                            <h1><span>CHECK</span>CAR</h1>
                        </li>
                        {SideBar.map((item,index)=>{
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default NavBar;