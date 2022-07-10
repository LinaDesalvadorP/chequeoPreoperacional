
const mysql = require('../../config/config.database')
const admin = require('../entitys/admin.model')
const Admin = admin.admin

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
            if (err)  return reject(err);
            resolve('Admin added')
        });
    })
}
exports.add = add;

const getAll = () => {
    return new Promise(function (resolve, reject) {
        let admins = []
        mysql.query("CALL get_admins", function (err, rows) {
            if (err)  return reject(err);
            rows[0].forEach(e=> admins.push(new Admin(e.user_name, e.first_name, e.last_name, e.is_banned)))
            resolve(admins)
        });
    })
}
exports.getAll = getAll;
