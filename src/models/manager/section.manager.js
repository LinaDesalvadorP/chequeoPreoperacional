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
