const mysql = require('../../config/config.database')
const answer = require('../entitys/answer.model')
const Answer = answer.answer


const saveNewAnswer = (statement) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO answer (statement) VALUES (?)", statement, function (err, result) {
            if (err)  return reject(err);
            resolve(result.insertId)
        });
    })
}
exports.saveNewAnswer = saveNewAnswer;

const getMAAndSAList = () =>{
    return new Promise(function (resolve, reject) {
        let answers = []
        mysql.query("CALL get_list_of_MA_and_SA_answers()" , function (err, result) {
            if (err)  return reject(err);
            result[0].forEach(e => answers.push(new Answer(e.id, e.statement)))
            resolve(answers)
        });
    })
}
exports.getMAAndSAList = getMAAndSAList;

