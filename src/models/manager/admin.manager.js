
const mysql = require('../../config/config.database')
const Admin = require('../entitys/admin.model')

const get = (userName) => {
    return new Promise(function (resolve, reject) {
        mysql.query("select * from administrator where user_name = ?", [userName], function (err, rows) {
            if (err) return  reject(err);
            if (rows.length === 0) reject('Admin not found')
            resolve(new Admin(rows[0].user_name, rows[0].first_name, rows[0].last_name))
        });
    })
}
exports.get = get;

const add = (username, firstname, lastname) => {
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO administrator VALUES (?,?,?);", [username, firstname, lastname], function (err, rows) {
            if (err)  return reject('Admin already exist');
            resolve('Admin added')
        });
    })
}
exports.add = add;
