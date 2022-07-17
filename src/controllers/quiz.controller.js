const questions = require('../models/manager/question.manager')
const sections = require('../models/manager/section.manager')
const quiz = require('../models/manager/quiz.manager')
const answers = require('../models/manager/answer.manager')


const getQuiz = async (req, res) => {
   const {licensePlate} = req.body
   const totalQuiz = await quiz.getTotalQuiz(licensePlate)
   let sectionsTest
   let unsolvedQuestions
   let newQuiz

   if (totalQuiz === 0) {
      sectionsTest = await sections.getInitialSections()
      unsolvedQuestions  = await questions.getInitialQuiz()
      newQuiz = quiz.createEmptyQuiz("Initial", sectionsTest)
   }else{
      unsolvedQuestions  = await questions.getTodayQuestions()
      sectionsTest = await sections.getTodaySections()
      newQuiz = quiz.createEmptyQuiz("Daily", sectionsTest)
   }

   for(let i = 0; i< unsolvedQuestions.length; i++){
      if (unsolvedQuestions[i].type === 'MA' || unsolvedQuestions[i].type === 'SA') {
         unsolvedQuestions[i].answerOptions = await questions.getAnswers(unsolvedQuestions[i].id)
      }
   }

   for(let i = 0; i< sectionsTest.length; i++){
      for(let j = 0; j< unsolvedQuestions.length; j++) {
         if (unsolvedQuestions[j].section === sectionsTest[i].name){
            sectionsTest[i].questions.push(unsolvedQuestions[j])
            unsolvedQuestions[j].section = undefined
         }
      }
   }

   return res.status(200).send(newQuiz)
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
            for (let selectedAnswers of answer.respuesta)
               await quiz.saveQuizSolved(quizId, answer.idQuestion, selectedAnswers)
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

const getTotalSolvedQuizByDay = async (req, res) =>{
   const {day} = req.body;
   const totalQuiz = await quiz.getTotalSolvedQuizByDay(day)
   return res.status(200).send(totalQuiz)
}
module.exports.getTotalSolvedQuizByDay = [getTotalSolvedQuizByDay];
