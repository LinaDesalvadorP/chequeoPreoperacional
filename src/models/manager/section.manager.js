const mysql = require('../../config/config.database')
const section = require('../entitys/section.model')
const Section = section.section
const SectionList = section.sectionList


const getTodaySections = () =>{
    let sections = []
    return new Promise(function (resolve, reject) {
        mysql.query("SELECT name, image_path as imgPath FROM today_sections",function (err, result) {
            if (err)  return reject(err);
            result.forEach(e=> {
                sections.push(new Section(e.name, e.imgPath))
            })
            resolve(sections)
        });
    })
}

exports.getTodaySections = getTodaySections;


const getInitialSections = () =>{
    let sections = []
    return new Promise(function (resolve, reject) {
        mysql.query("SELECT name, image_path as imgPath FROM initial_quiz_sections",function (err, result) {
            if (err)  return reject(err);
            result.forEach(e=> {
                sections.push(new Section(e.name, e.imgPath))
            })
            resolve(sections)
        });
    })
}

exports.getInitialSections = getInitialSections;

const getQuizSections = (quizId) =>{
    let sections = []
    return new Promise(function (resolve, reject) {
        mysql.query("call get_quiz_sections(?)",quizId,function (err, result) {
            if (err)  return reject(err);
            result[0].forEach(e => sections.push(new Section(e.name, e.image_path)))
            resolve(sections)
        });
    })
}

exports.getQuizSections = getQuizSections;

const getAllSections = () =>{
    let sections = []
    return new Promise(function (resolve, reject) {
        mysql.query("SELECT id, name FROM section",function (err, result) {
            if (err)  return reject(err);
            console.log(result)
            result.forEach(e => sections.push(new SectionList(e.name)))
            resolve(sections)
        });
    })
}

exports.getAllSections = getAllSections;

const fillSectionsWithAnswers = async (sections, questions) =>{
    for(let s of sections){
        for(let q of questions) {
            if (q.section === s.name){
                s.questions.push(q)
                q.section = undefined
            }
        }
    }
}
exports.fillSectionsWithAnswers = fillSectionsWithAnswers;
