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
            resolve(result.insertId)
        });
    })
}
exports.addNumericAlert = addNumericAlert;

const addDateAlert = async (question_id, statement,dateCondition) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO ALERT(question_id, statement,days_condition) values(?,?,?)", [question_id, statement,dateCondition],function (err, result) {
            if (err)  return reject(err);
            resolve(result.insertId)
        });
    })
}
exports.addDateAlert = addDateAlert;

const addSliderAlert = async (question_id, statement,rankCondition) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO ALERT(question_id, statement,rank_condition) values(?,?,?)", [question_id, statement,rankCondition],function (err, result) {
            if (err)  return reject(err);
            resolve(result.insertId)
        });
    })
}
exports.addSliderAlert = addSliderAlert;

const addMultipleOptionALert = async (question_id, statement,answerCondition) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO ALERT(question_id, statement,answer_condition) values(?,?,?)", [question_id, statement,answerCondition],function (err, result) {
            if (err)  return reject(err);
            resolve(result.insertId)
        });
    })
}
exports.addMultipleOptionALert = addMultipleOptionALert;

const addAlert = async (question_id, alerts, questionType) =>{
    if (alerts !== undefined) {
        switch (questionType) {
            case 'N':
                await addNumericAlert(questionId, alerts.maxAlertMessage, alerts.max)
                break
            case 'D':
                await addDateAlert(questionId, alerts.minAlertMessage, alerts.minDate)
                break
            case 'S':
                await addSliderAlert(questionId, alerts.minAlertMessage, alerts.min)
                break
            case 'MA':
            case 'SA':

                break
        }
    }
}
exports.addAlert = addAlert;
