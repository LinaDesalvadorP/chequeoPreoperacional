const questions = require('../models/manager/question.manager')
const answers = require('../models/manager/answer.manager')


const getQuestion = async (req, res) =>{
    const questionId = req.params.id
    const question = await  questions.getQuestion(questionId)
    if (question.type === 'MA' || question.type === 'SA') question.answerOptions = await questions.getAnswers(questionId)

    res.status(200).send(question)
}
module.exports.getQuestion = [getQuestion];

const getAll = async (req, res) =>{
    const questionList = await questions.getQuestionList()
    res.status(200).send(questionList)
}
module.exports.getAll = [getAll];


const getMAAndSAList = async (req, res) =>{
    const answerList = await answers.getMAAndSAList()
    res.status(200).send(answerList)
}
module.exports.getMAAndSAList = [getMAAndSAList];

const addQuestion = async (req, res) =>{
}
module.exports.addQuestion = [addQuestion];
