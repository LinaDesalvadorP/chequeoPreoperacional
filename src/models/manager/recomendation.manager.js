const mysql = require('../../config/config.database')


const saveNewRecomendation = (statement, type) =>{
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO recomendation (text, type) VALUES (?, ?)", [statement, type], function (err, result) {
            if (err)  return reject(err);
            resolve(result.insertId)
        });
    })
}
exports.saveNewRecomendation = saveNewRecomendation;
