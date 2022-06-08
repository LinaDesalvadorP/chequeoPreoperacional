const mysql = require('../../config/config.database')


const add = (license_plate, cc, movil, model, brand) => {
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO vehicle VALUES (?,?,?,?,?);", [license_plate,cc,movil,model,brand], function (err, rows) {
            if (err)  return reject('Vehicle already exist');
            resolve('Vehicle added')
        });
    })
}
exports.add = add;

