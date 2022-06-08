const tests = require('../models/manager/test.manager');
const questions = require('../models/manager/question.manager')

const getUnsolvedTest = async (req, res) => {
   const  unsolvedTest  = await tests.createUnsolvedTest()

   for(let i = 0; i< unsolvedTest.length; i++){
      if (unsolvedTest[i].type === 'MA' || unsolvedTest[i].type === 'SA') {
         unsolvedTest[i].answerOptions = await questions.getAnswers(unsolvedTest[i].id)}
   }

   res.status(200).json(unsolvedTest)
}

module.exports.getUnsolvedTest = [getUnsolvedTest];
