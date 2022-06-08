
const questions = require('../models/manager/question.manager')
const sections = require('../models/manager/section.manager')

const getUnsolvedTest = async (req, res) => {
   const  unsolvedQuestions  = await questions.getUnsolvedQuestions(1)
   const sectionsTest = await sections.getSectionsByFrecuency(1)

   for(let i = 0; i< unsolvedQuestions.length; i++){
      if (unsolvedQuestions[i].type === 'MA' || unsolvedQuestions[i].type === 'SA') {
         unsolvedQuestions[i].answerOptions = await questions.getAnswers(unsolvedQuestions[i].id)
      }
   }

   for(let i = 0; i< sectionsTest.length; i++){
      for(let j = 0; j< unsolvedQuestions.length; j++) {
         if (unsolvedQuestions[j].section === sectionsTest[i].name){
            sectionsTest[i].questions.push(unsolvedQuestions[j])
         }
      }
   }

   console.log(sectionsTest)

   res.status(200).json(sectionsTest)
}

module.exports.getUnsolvedTest = [getUnsolvedTest];
