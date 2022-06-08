const mysql = require('../../config/config.database')
const answer = require('../entitys/answer.model')
const Answer = answer.answer
const question = require('../entitys/question.model')
const Question = question.question

const getUnsolvedQuestions = (frecuency) =>{
    let questions = []
    return new Promise(function (resolve, reject) {
        mysql.query("select q.id, q.statement, s.name, q.type from question q inner join section s on s.id = q.id_section where q.frecuency = ?", [frecuency], function (err, result) {
            if (err)  return reject(err);
            result.forEach(e => {
                questions.push(new Question(e.id, e.statement, e.name, e.type))
            })
            resolve(questions)
        });
    })
}
exports.getUnsolvedQuestions = getUnsolvedQuestions;


const getAnswers = (questionId) => {
    let answers = []
    return new Promise(function (resolve, reject) {
        mysql.query("select a.* from question q inner join question_answer qa on q.id = qa.question_id inner join answer a on qa.answer_id = a.id where q.id = ?;", [questionId],function (err, result) {
            if (err)  return reject(err);
            result.forEach(e=> {
                answers.push(new Answer(e.id, e.statement))
            })
            resolve(answers)
        });
    })
}
exports.getAnswers = getAnswers;
