const mysql = require('../../config/config.database')
const answer = require('../entitys/answer.model')
const Answer = answer.answer


const saveNewOpenAnswer = (statement) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO answer (statement) VALUES (?)", statement, function (err, result) {
            if (err)  return reject(err);
            resolve(result.insertId)
        });
    })
}
exports.saveNewOpenAnswer = saveNewOpenAnswer;
