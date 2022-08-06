const mysql = require('../../config/config.database')
const answer = require('../entitys/answer.model')
const Answer = answer.answer
const SolvedSelectionAnswer = answer.solvedSelectionAnswer
const SolvedOpenAnswer = answer.solvedOpenAnswer
const question = require('../entitys/question.model')
const Question = question.question
const SolvedOpenQuestion = question.solvedOpenQuestion
const SolvedSelectionQuestion = question.solvedSelectionQuestion
const QuestionInfo = question.questionInfo
const recommendation = require('../entitys/recomendation.model')
const Recommendation = recommendation.recommendation
const QuestionList = question.questionList

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

const getInitialQuestions = () =>{
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
exports.getInitialQuestions = getInitialQuestions;

const getQuestion = (questionId) => {
    return new Promise(function (resolve, reject) {
        mysql.query("SELECT q.id, q.statement, q.type ,q.frecuency, s.name FROM question q inner join section s on s.id = q.id_section where q.id = ?", [questionId],function (err, result) {
          if (err) reject(reject)
            resolve(new QuestionInfo(result[0].id, result[0].statement, result[0].name, result[0].type, result[0].frecuency))
        });
    })
}
exports.getQuestion = getQuestion;

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

const saveQuestionAnswer = (questionId, answerId) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO question_answer VALUES (?,?)", [questionId, answerId],function (err, result) {
            if (err)  return reject(err);
            resolve('Added')
        });
    })
}
exports.saveQuestionAnswer = saveQuestionAnswer;

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

const getOptionsAnswers = async (questions) =>{
    for(let q of questions){
        if (q.type === 'MA' || q.type === 'SA') {
            q.answerOptions = await getAnswers(q.id)
        }
    }
}
exports.getOptionsAnswers = getOptionsAnswers;

const getRecommendation = async (questionId) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("CALL get_recomendation(?)", [questionId],function (err, result) {
            if (err)  return reject(err);
            result[0].forEach(e=> resolve(new Recommendation(e.text, e.type)))
        });
    })
}
exports.getRecommendation = getRecommendation;

const getQuestionList = async () =>{
    return new Promise(function (resolve, reject) {
        let questions = []
        mysql.query("select id, statement, type, frecuency from question",function (err, result) {
            if (err)  return reject(err);
            result.forEach(e => questions.push(new QuestionList(e.id,e.statement,e.type,e.frecuency)))
            resolve(questions)
        });
    })
}
exports.getQuestionList = getQuestionList;

const fillRecommendation = async (questions) =>{
    for(let q of questions){
        q.recommendation = await getRecommendation(q.id)
    }
}
exports.fillRecommendation = fillRecommendation;


const addNewQuestion = async (section, type, statement, frecuency) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO question (id_section, type, statement, frecuency) VALUES (?,?,?,?)", [section, type, statement, frecuency] ,function (err, result) {
            if (err)  return reject(err);
            resolve(result.insertId)
        });
    })
}
exports.addNewQuestion = addNewQuestion;


const addNewRecomendationQuestion = async (questionId, recomendationId) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO recomendation_question (question_id, recomendation_id) VALUES (?,?)", [questionId, recomendationId] ,function (err, result) {
            if (err)  return reject(err);
            resolve(result.insertId)
        });
    })
}
exports.addNewRecomendationQuestion = addNewRecomendationQuestion;
