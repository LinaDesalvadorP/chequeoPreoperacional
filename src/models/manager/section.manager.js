const mysql = require('../../config/config.database')
const section = require('../entitys/section.model')
const Section = section.section

const getSectionsByFrecuency = (frecuecy) => {
    let sections = []
    return new Promise(function (resolve, reject) {
        mysql.query("select DISTINCT(s.name), s.image_path as img from section s inner join question q on q.id_section = s.id where frecuency =  ?;", [frecuecy],function (err, result) {
            if (err)  return reject(err);
            result.forEach(e=> {
                sections.push(new Section(e.name, e.img))
            })
            resolve(sections)
        });
    })
}
exports.getSectionsByFrecuency = getSectionsByFrecuency;
