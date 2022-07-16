const mysql = require('../../config/config.database')
const answer = require('../entitys/answer.model')
const Answer = answer.answer
const SolvedSelectionAnswer = answer.solvedSelectionAnswer
const SolvedOpenAnswer = answer.solvedOpenAnswer
const question = require('../entitys/question.model')
const Question = question.question
const SolvedOpenQuestion = question.solvedOpenQuestion
const SolvedSelectionQuestion = question.solvedSelectionQuestion

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

const getInitialQuiz = () =>{
    let questions = []
    return new Promise(function (resolve, reject) {
        mysql.query("SELECT * FROM initial_quiz", function (err, result) {
            if (err)  return reject(err);
            result.forEach(e => {
                questions.push(new Question(e.id, e.statement, e.section, e.type))
            })
            resolve(questions)
        });
    })
}
exports.getInitialQuiz = getInitialQuiz;


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


const getQuestionType = (questionId) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("CALL get_question_type(?, @type); select @type as type", [questionId],function (err, result) {
            if (err)  return reject(err);
            result[1].forEach(e => resolve(e.type))
        });
    })
}
exports.getQuestionType = getQuestionType;

const saveQuestionSolved = (questionId, answerId) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO question_answer VALUES (?,?)", [questionId, answerId],function (err, result) {
            if (err)  return reject(err);
            resolve('Added')
        });
    })
}
exports.saveQuestionSolved = saveQuestionSolved;

const getUnsolvedQuestions= (quizId) =>{
    let questions = []
    return new Promise(function (resolve, reject) {
        mysql.query("CALL get_unsolved_quiz(?)",quizId ,function (err, result) {
            if (err)  return reject(err);
           result[0].forEach(e => {
               if (e.type === 'MA' || e.type === 'SA'){
                   questions.push(new SolvedSelectionQuestion(e.id,e.statement, e.name, e.type))
               }else{
                   questions.push(new SolvedOpenQuestion(e.id ,e.statement, e.name, e.type))
               }
           })
            resolve(questions)
        });
    })
}
exports.getUnsolvedQuestions = getUnsolvedQuestions;

const getSolvedSelectedAnswers = (quizId, questionId) => {
    let answers = []
    return new Promise(function (resolve, reject) {
        mysql.query("CALL get_selected_answers(?,?)", [quizId, questionId],function (err, result) {
            if (err)  return reject(err);
            result[0].forEach(e=> {
                answers.push(new SolvedSelectionAnswer(e.statement, Boolean(e.selected)))
            })
            resolve(answers)
        });
    })
}
exports.getSolvedSelectedAnswers = getSolvedSelectedAnswers;

const getSolvedOpenAnswer = (quizId, questionId) => {
    return new Promise(function (resolve, reject) {
        mysql.query("CALL get_open_answer(?,?)", [quizId, questionId],function (err, result) {
            if (err)  return reject(err);
                resolve(new SolvedOpenAnswer(result[0][0].statement))
        });
    })
}
exports.getSolvedOpenAnswer = getSolvedOpenAnswer;

