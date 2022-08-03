const questions = require('../models/manager/question.manager')
const sections = require('../models/manager/section.manager')
const quiz = require('../models/manager/quiz.manager')
const answers = require('../models/manager/answer.manager')

const getTodayQuiz = async (req, res) =>{
   const sectionsQuiz = await  sections.getTodaySections()
   const unsolvedQuestions = await  questions.getTodayQuestions()
   await questions.fillRecommendation(unsolvedQuestions)
   await questions.getOptionsAnswers(unsolvedQuestions)
   await sections.fillSectionsWithAnswers(sectionsQuiz, unsolvedQuestions)


   res.status(200).send(sectionsQuiz)
}
module.exports.getTodayQuiz = [getTodayQuiz];

const getInitialQuiz = async (req, res) =>{
   const sectionsQuiz = await  sections.getInitialSections()
   const unsolvedQuestions = await  questions.getInitialQuestions()
   await questions.fillRecommendation(unsolvedQuestions)
   await questions.getOptionsAnswers(unsolvedQuestions)
   await sections.fillSectionsWithAnswers(sectionsQuiz, unsolvedQuestions)

   res.status(200).send(sectionsQuiz)
}
module.exports.getInitialQuiz = [getInitialQuiz];


const getQuiz = async (req, res) => {
   const licensePlate = req.params.license
   const totalQuiz = await quiz.getTotalQuiz(licensePlate)

   if (totalQuiz === 0) return res.status(200).send({message: "Initial quiz"})
   return res.status(200).send({message:"Daily quiz"})
}
module.exports.getQuiz = [getQuiz];

const saveQuiz = async (req, res) => {
   const testInfo = req.body
   const quizAnswers = testInfo[1]
   const quizId = await quiz.createQuiz(testInfo[0])

   for (let answer of quizAnswers){
      if (await questions.getQuestionType(answer.idQuestion) !== 'SA' && await questions.getQuestionType(answer.idQuestion) !== 'MA'){
           answer.respuesta = await answers.saveNewOpenAnswer(answer.respuesta)
      }
      switch (await questions.getQuestionType(answer.idQuestion)){
         case 'MA':
            for (let selectedAnswer of answer.respuesta)
               await quiz.saveQuizSolved(quizId, answer.idQuestion, selectedAnswer)
            break
         case 'SA':
               await quiz.saveQuizSolved(quizId, answer.idQuestion, answer.respuesta)
            break
         case 'O':
         case 'D':
         case 'S':
         case 'N':
               await questions.saveQuestionSolved(answer.idQuestion, answer.respuesta)
               await quiz.saveQuizSolved(quizId,answer.idQuestion,answer.respuesta)
            break
      }

   }

   return res.status(200).send({message: "Ok"})
}
module.exports.saveQuiz = [saveQuiz];

const getQuizList = async (req, res) =>{
   return res.status(200).send(await  quiz.getQuizList())
}
module.exports.getQuizList = [getQuizList];

const getSolvedQuiz = async (req, res) =>{
   const quizId  = req.params.quizId;
   const sectionsTest = await sections.getQuizSections(quizId)
   const quiz = await questions.getUnsolvedQuestions(quizId)

   for (let question of quiz){
      if (question.type === 'MA' || question.type === 'SA'){
         question.answerOptions = await questions.getSolvedSelectedAnswers(quizId, question.id)
      }else{
         question.solvedOpenAnswer = await questions.getSolvedOpenAnswer(quizId, question.id)
      }
      question.id = undefined
   }

   for (let section of sectionsTest){
      for (let question of quiz){
         if(question.section === section.name ){
            section.questions.push(question)
            question.section = undefined
         }
      }
   }

   return res.status(200).send(sectionsTest)
}
module.exports.getSolvedQuiz = [getSolvedQuiz];

const getTotalSolvedQuizToday = async (req, res) =>{
   const totalQuiz = await quiz.getTotalSolvedQuizByDay()
   return res.status(200).send(totalQuiz)
}
module.exports.getTotalSolvedQuizToday = [getTotalSolvedQuizToday];

const getTotalChecksInMonth = async (req, res) =>{
   const {year, month} = req.body
   const totalQuiz = await quiz.getTotalChecksInMonth(year,month)
   return res.status(200).send(totalQuiz)
}
module.exports.getTotalChecksInMonth = [getTotalChecksInMonth];
