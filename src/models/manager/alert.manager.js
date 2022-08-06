const alert = require('../entitys/alert.model')
const mysql = require('../../config/config.database')
const dateFormat = require('date-and-time')
const Alert = alert.alert;


const getAll = async () =>{
    return new Promise(function (resolve, reject) {
        const alerts  = [];
        mysql.query("SELECT * FROM alerts_vehicle_view",function (err, result) {
            if (err)  return reject(err);
            result.forEach(e => alerts.push(new Alert(e.id, e.movil, e.statement, dateFormat.format(e.data_alert, 'YYYY-MM-DD'), Boolean(e.is_solved))))
            resolve(alerts)
        });
    })
}
exports.getAll = getAll;

const resolveAlert = async (alertId) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("UPDATE vehicle_alert SET is_solved = 1 WHERE id = ?;", [alertId],function (err, result) {
            if (err)  return reject(err);
            resolve("Alert solved")
        });
    })
}
exports.resolveAlert = resolveAlert;



const addNumericAlert = async (question_id, statement,numberCondition) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO ALERT(question_id, statement,number_condition) values(?,?,?)", [question_id, statement,numberCondition],function (err, result) {
            if (err)  return reject(err);
            resolve(resolve.insertId)
        });
    })
}
exports.addNumericAlert = addNumericAlert;

const addDateAlert = async (question_id, statement,dateCondition) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO ALERT(question_id, statement,days_condition) values(?,?,?)", [question_id, statement,dateCondition],function (err, result) {
            if (err)  return reject(err);
            resolve(resolve.insertId)
        });
    })
}
exports.addDateAlert = addDateAlert;

const addSliderAlert = async (question_id, statement,rankCondition) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO ALERT(question_id, statement,rank_condition) values(?,?,?)", [question_id, statement,rankCondition],function (err, result) {
            if (err)  return reject(err);
            resolve(resolve.insertId)
        });
    })
}
exports.addSliderAlert = addSliderAlert;
