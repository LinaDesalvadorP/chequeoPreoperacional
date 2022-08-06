const questions = require('../models/manager/question.manager')
const answers = require('../models/manager/answer.manager')
const recomendationManager = require('../models/manager/recomendation.manager')
const alertsM = require('../models/manager/alert.manager')


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
    const {section, statementQuestion, frecuency, answerType,alerts,totalOptions, recomendations} = req.body
    const questionId = await questions.addNewQuestion(section, answerType ,statementQuestion, frecuency)


    if(answerType === 'SA' || answerType === 'MA'){
        for (let option of totalOptions){
            const answerId = await answers.saveNewAnswer(option.option)
            if (option.alert === true){

            }
        }
    }

     await  alertsM.addAlert(questionId, alerts, answerType)

    if (recomendations !== undefined){
        for (let recomendation of recomendations){
            const recomendationId =  await recomendationManager.saveNewRecomendation(recomendation.recomendation, recomendation.type)
            await  questions.addNewRecomendationQuestion(questionId, recomendationId)
        }
    }

    res.status(200).send({message: "Pregunta agregada" })
}
module.exports.addQuestion = [addQuestion];
