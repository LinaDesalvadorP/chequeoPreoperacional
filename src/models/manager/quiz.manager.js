const mysql = require('../../config/config.database')
const quiz = require('../entitys/quiz.model')
const QuizListFormat = quiz.quizListFormat
const Quiz = quiz.quiz
const RealizedQuiz = quiz.realizedQuiz

const createQuiz = (licensePlate) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO quiz (license_plate, presentaion) VALUES (?, CURDATE());", licensePlate,function (err, result) {
            if (err)  return reject(err);
            resolve(result.insertId)
        });
    })
}
exports.createQuiz = createQuiz;

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
    let quizList = []
    return new Promise(function (resolve, reject) {
        mysql.query("SELECT * FROM quiz_list",function (err, result) {
            if (err)  return reject(err);
            result.forEach(e => quizList.push(new QuizListFormat(e.id,e.movil, e.name, e.license_plate, e.presentation)))
            resolve(quizList)
        });
    })
}
exports.getQuizList = getQuizList;

const getTotalSolvedQuizToday = () =>{
    return new Promise(function (resolve, reject) {
        mysql.query("call get_total_solved_quiz_today();",function (err, result) {
            if (err)  return reject(err);
            result[0].forEach(e =>  resolve(e))
        });
    })
}
exports.getTotalSolvedQuizByDay = getTotalSolvedQuizToday;

const getTotalChecksInMonth = (year, month) =>{
    return new Promise(function (resolve, reject) {
        let checks = []
        mysql.query("call get_today_total_checks_in_month(?,?);",[year, month],function (err, result) {
            if (err)  return reject(err);
            result[0].forEach(e =>  checks.push(new RealizedQuiz(e.day, new Date(e.realized))))
            resolve(checks)
        });
    })
}
exports.getTotalChecksInMonth = getTotalChecksInMonth;

const createEmptyQuiz = (type, sections) =>{
    return new Quiz(type, sections)
}
exports.createEmptyQuiz = createEmptyQuiz;

