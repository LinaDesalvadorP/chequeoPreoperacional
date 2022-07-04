const mysql = require('../../config/config.database')
const section = require('../entitys/section.model')
const Section = section.section


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

const getQuizSections = (quizId) =>{
    let sections = []
    return new Promise(function (resolve, reject) {
        mysql.query("call get_quiz_sectionsz(?)",quizId,function (err, result) {
            if (err)  return reject(err);
            result[0].forEach(e => sections.push(new Section(e.name, e.image_path)))
            resolve(sections)
        });
    })
}

exports.getQuizSections = getQuizSections;
