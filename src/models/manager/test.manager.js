const mysql = require('../../config/config.database')
const question = require('../entitys/question.model')
const Question = question.question

const createUnsolvedTest = () =>{
    let questions = []
    return new Promise(function (resolve, reject) {
        mysql.query("select q.id, q.statement, s.name, q.type from question q inner join section s on s.id = q.id_section where q.frecuency = 1", function (err, result) {
            if (err)  return reject(err);
             result.forEach(e => {
                questions.push(new Question(e.id, e.statement, e.name, e.type))
            })
            resolve(questions)
        });
    })
}
exports.createUnsolvedTest = createUnsolvedTest;


