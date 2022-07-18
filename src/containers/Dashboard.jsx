import React, {useState} from "react";
import CircularGraph from "../components/CircularGraph";
import styles from '../styles/Dashboard.module.scss';
import Navbar from "./../components/NavBar";
import Notifications from './Notifications';
import LineChart from './../components/LineChart';
import moment from 'moment';
import 'moment/locale/es';

const Dashboard = () => {
  const [reviewScore, setReviewScore] = useState(50);
  const [actualChecked, setActualChecked] = useState(148);
  const [totalTaxis, setTotalTaxis] = useState(400);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.notifications}>
            <h2>Panel de notificaciones</h2>
            <Notifications/>
        </div>
        <div className={styles.circularGraph}>
            <h2>Chequeos realizados</h2>
            <small>{moment().format("DD MMM YYYY hh:mm")}</small>
            <div className={styles.graph}>
            <CircularGraph score={reviewScore}/>
            </div>
            <h2>{actualChecked} de {totalTaxis}</h2>
        </div>
        <div className={styles.barsGraph}>
          <h2>Reporte de {moment().format("MMMM")}</h2>
          <div className={styles.graphB}>
            <LineChart/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
