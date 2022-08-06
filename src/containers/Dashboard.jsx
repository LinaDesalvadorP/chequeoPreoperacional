import React, {useState, useEffect} from "react";
import CircularGraph from "../components/CircularGraph";
import styles from '../styles/Dashboard.module.scss';
import Navbar from "./../components/NavBar";
import Notifications from './Notifications';
import LineChart from './../components/LineChart';
import Dropdown from "react-bootstrap/Dropdown";
import moment from 'moment';
import 'moment/locale/es';

const API_GET_SOLVED_TODAY = "http://localhost:5000/api/quiz/get/solved-today";

const Dashboard = () => {
  const [reviewScore, setReviewScore] = useState(0);
  const [actualChecked, setActualChecked] = useState();
  const [totalTaxis, setTotalTaxis] = useState();
  const [month, setMonth] = useState({number: moment().format("M"), name: moment().format("MMMM")});

  useEffect(() => {
    //Resueltos en el día
    async function fetchSolvedToday() {
      const response = await fetch(API_GET_SOLVED_TODAY);
      const json = await response.json();
      const realized = json.realized;
      const total = json.total;
      setActualChecked(realized);
      setTotalTaxis(total)
      setReviewScore(parseInt((realized*100)/total));
    }
    fetchSolvedToday();
  }, [setReviewScore]);

  const monthSelected = (month) =>{
    setMonth(month)
  }

  const MonthsOfTheYear = [
    {number: "1", name: "enero"},
    {number: "2", name: "febrero"},
    {number: "3", name: "marzo"},
    {number: "4", name: "abril"},
    {number: "5", name: "mayo"},
    {number: "6", name: "junio"},
    {number: "7", name: "julio"},
    {number: "8", name: "agosto"},
    {number: "9", name: "septiembre"},
    {number: "10", name: "octubre"},
    {number: "11", name: "noviembre"},
    {number: "12", name: "diciembre"}
  ]
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
          <div className={styles.headerBarsGraph}>
            <h2>Reporte de</h2>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                {month.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {MonthsOfTheYear.map((month, index) =>{
                  return(
                    <Dropdown.Item key={index} onClick={()=>monthSelected(month)}>{month.name}</Dropdown.Item>
                  )
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className={styles.graphB}>
            <LineChart monthIn={month} yearIn={2022}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
