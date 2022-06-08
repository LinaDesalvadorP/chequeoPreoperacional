const mysql = require('../../config/config.database')
const answer = require('../entitys/answer.model')
const Answer = answer.answer

const getAnswers = (questionId) => {
    let answers = []
    return new Promise(function (resolve, reject) {
        mysql.query("select a.* from question q inner join question_answer qa on q.id = qa.question_id inner join answer a on qa.answer_id = a.id where q.id = ?;", [questionId],function (err, result) {
            if (err)  return reject(err);
            result.forEach(e=> {
                answers.push(new Answer(e.id, e.statement))
            })
            console.log(answers)
            resolve(answers)
        });
    })
}
exports.getAnswers = getAnswers;
