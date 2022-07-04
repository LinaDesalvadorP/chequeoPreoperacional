const mysql = require('../../config/config.database')
const quiz = require('../entitys/quiz.model')
const Quiz = quiz.quiz

const createTest = (licensePlate) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO quiz (license_plate, presentaion) VALUES (?, CURDATE());", licensePlate,function (err, result) {
            if (err)  return reject(err);
            resolve(result.insertId)
        });
    })
}
exports.createTest = createTest;

const saveQuizSolved = (quizId, questionId, answerId) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO solved_quiz VALUES (?,?,?);", [quizId,questionId,answerId],function (err, result) {
            if (err)  return reject(err);
            resolve("Added")
        });
    })
}
exports.saveQuizSolved = saveQuizSolved;

const getQuizList = () =>{
    let quizes = []
    return new Promise(function (resolve, reject) {
        mysql.query("SELECT * FROM quiz_list",function (err, result) {
            if (err)  return reject(err);
            result.forEach(e => quizes.push(new Quiz(e.id,e.movil, e.name, e.license_plate, e.presentation)))
            resolve(quizes)
        });
    })
}
exports.getQuizList = getQuizList;
