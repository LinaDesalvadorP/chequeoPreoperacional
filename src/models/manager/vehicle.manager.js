const mysql = require('../../config/config.database')


const add = (license_plate, cc, movil, model, brand) => {
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO vehicle VALUES (?,?,?,?,?);", [license_plate,cc,movil,model,brand], function (err, rows) {
            if (err)  return reject(err);
            resolve('Vehicle added')
        });
    })
}
exports.add = add;

