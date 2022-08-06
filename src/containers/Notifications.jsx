import React, { useState, useEffect } from "react";
import styles from "./../styles/Notifications.module.scss";
import * as FaIcons from "react-icons/fa";
import { getPastelColor } from "pastel-color";
import axios from "axios";

const API_GET_NOTIFICATIONS = "http://localhost:5000/api/admin/get-alerts";
const API_POST_SOLVED_NOTIFICATION =
  "http://localhost:5000/api/admin/solve-alert";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      const response = await fetch(API_GET_NOTIFICATIONS);
      const json = await response.json();
      setNotifications(json);
    }
    fetchNotifications();
  }, [setNotifications]);

  const deleteNotification = (id) => {
    axios
      .post(API_POST_SOLVED_NOTIFICATION, { alertId: id })
      .then((response) => {
        axios.get(API_GET_NOTIFICATIONS)
        .then(response => {
            setNotifications(response.data)
        })
        .catch(e => {
            console.log(e.message)
        })
      });
  };

  return (
    <>
      <div className={styles["item-list"]}>
        {notifications.map((item, index) => (
          <div key={index} className={styles.container}>
            <div className={styles.movil}>
              <div
                style={{ backgroundColor: getPastelColor().hex }}
                className={styles.movilCircle}
              >
                {item.movil}
              </div>
            </div>
            <div className={styles.statement}>
              {item.statement}
              <br />
              <small>{item.data_alert}</small>
            </div>
            <div className={styles.checkBtnContainer}>
              <FaIcons.FaCheckSquare
                className={styles.checkBtn}
                size="25px"
                onClick={() => {
                  deleteNotification(item.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notifications;
