import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideBar } from './SideBar'
import { IconContext } from 'react-icons';
import styles from '../styles/NavBar.module.scss';
import clsx from "clsx";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={styles.navbar}>
          <Link to='#' className={styles['menu-bars']}>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={clsx(styles['nav-menu'],sidebar && styles.active)}>
          <ul className={styles['nav-menu-items']} onClick={showSidebar}>
            <li className={styles['navbar-toggle']}>
              <Link to='#' className={styles['menu-bars']}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SideBar.map((item, index) => {
              return (
                <li key={index} className={styles[item.cName]}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;