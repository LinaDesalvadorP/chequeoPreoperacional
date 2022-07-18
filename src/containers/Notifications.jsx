import React, {useState} from "react";
import styles from "./../styles/Notifications.module.scss";
import * as FaIcons from 'react-icons/fa';
import { getPastelColor } from "pastel-color";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { movil: "156", alert: "El movil 156 tiene bajo liquido de frenos", alertDate: "11 jun 2022",isCheckNotification: "false" },
    { movil: "156", alert: "El movil 396 tiene el labrado de las llantas por debajo del indicado", alertDate: "11 jun 2022",isCheckNotification: "false" },
    { movil: "156", alert: "El movil 128 drfghj tgyhj ftghj ghjk ", alertDate: "11 jun 2022",isCheckNotification: "false" },
    { movil: "156", alert: "El movil 128 drfghj tgyhj ftghj ghjk ", alertDate: "11 jun 2022",isCheckNotification: "false" },
    { movil: "156", alert: "El movil 128 drfghj tgyhj ftghj ghjk ", alertDate: "11 jun 2022",isCheckNotification: "false" },
    { movil: "156", alert: "El movil 128 drfghj tgyhj ftghj ghjk ", alertDate: "11 jun 2022",isCheckNotification: "false" },
    { movil: "156", alert: "El movil 128 drfghj tgyhj ftghj ghjk ", alertDate: "11 jun 2022",isCheckNotification: "false" },
    { movil: "156", alert: "El movil 128 drfghj tgyhj ftghj ghjk ", alertDate: "11 jun 2022",isCheckNotification: "false" },
    { movil: "156", alert: "El movil 128 drfghj tgyhj ftghj ghjk ", alertDate: "11 jun 2022",isCheckNotification: "false" },
    { movil: "156", alert: "El movil 128 drfghj tgyhj ftghj ghjk ", alertDate: "11 jun 2022",isCheckNotification: "false" },
    { movil: "156", alert: "El movil 128 drfghj tgyhj ftghj ghjk ", alertDate: "11 jun 2022",isCheckNotification: "false" },
  ]);

  const deleteNotification = () => {
    console.log("delete");
  }

  return (
    <>
      <div className={styles["item-list"]}>
        {notifications.map((item, index) => (
          <div className={styles["item-container"]}>
            <div style={{backgroundColor: getPastelColor().hex}} className={styles["item-movil"]}>
                {item.movil}
              {/* {item.isCheckNotification ? (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span className="completed">{item.itemName}</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCircle} />
                  <span>{item.itemName}</span>
                </>
              )} */}
            </div>
            <div className="item-content-alert">
                {item.alert}
                {item.alertDate}
            </div>
            <div className={styles["item-alert"]}>
            <FaIcons.FaTrash onClick={deleteNotification} />
                {/* <span> {item.quantity} </span>
              <button>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
              <button>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button> */}
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notifications;
