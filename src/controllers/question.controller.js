const questions = require('../models/manager/question.manager')


const getQuestion = async (req, res) =>{
    const questionId = req.params.id
    const question = await  questions.getQuestion(questionId)
    if (question.type === 'MA' || question.type === 'SA') question.answerOptions = await questions.getAnswers(questionId)

    res.status(200).send(question)
}
module.exports.getQuestion = [getQuestion];
