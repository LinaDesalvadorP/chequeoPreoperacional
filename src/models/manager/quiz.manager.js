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

const getTotalQuiz = (licensePlate) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("CALL get_total_quiz_by_license_plate(?, @total); select @total as total",  [licensePlate],function (err, result) {
            if (err)  return reject(err);
            result[1].forEach(e=> resolve(e.total))

        });
    })
}
exports.getTotalQuiz = getTotalQuiz;

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

const getTotalSolvedQuizByDay = (day) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("call get_total_solved_quiz_by_day(?);",day,function (err, result) {
            if (err)  return reject(err);
         result[0].forEach(e =>  resolve(e))
        });
    })
}
exports.getTotalSolvedQuizByDay = getTotalSolvedQuizByDay;

