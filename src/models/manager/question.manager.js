const mysql = require('../../config/config.database')
const answer = require('../entitys/answer.model')
const Answer = answer.answer
const question = require('../entitys/question.model')
const Question = question.question

const getTodayQuestions = () =>{
    let questions = []
    return new Promise(function (resolve, reject) {
        mysql.query("SELECT * FROM today_quiz", function (err, result) {
            if (err)  return reject(err);
            result.forEach(e => {
                questions.push(new Question(e.id, e.statement, e.name, e.type))
            })
            resolve(questions)
        });
    })
}
exports.getTodayQuestions = getTodayQuestions;


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
