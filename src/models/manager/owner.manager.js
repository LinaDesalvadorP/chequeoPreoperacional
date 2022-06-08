const mysql = require('../../config/config.database')
const Owner = require('../entitys/owner.model')

const get = (cc) => {
    return new Promise(function (resolve, reject) {
        mysql.query("select * from owner where cedula = ?", [cc], function (err, rows) {
            if (err) return  reject(err);
            if (rows.length === 0) return reject('Owner not found')
            resolve(new Owner(rows[0].cedula, rows[0].first_name, rows[0].last_name))
        });
    })
}
exports.get = get;

const add = (cc, firstname, lastname) => {
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO owner VALUES (?,?,?);", [cc, firstname, lastname], function (err, rows) {
            if (err)  return reject('Owner already exist');
            resolve('Owner added')
        });
    })
}
exports.add = add;
