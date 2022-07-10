const mysql = require('../../config/config.database')
const owner = require('../entitys/owner.model')
const Owner = owner.owner

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

const getAll = () => {
    return new Promise(function (resolve, reject) {
        const owners =[]
        mysql.query("SELECT * FROM owner", function (err, rows) {
            if (err)  return reject(err);
            rows.forEach(e => owners.push(new Owner(e.cedula, e.first_name, e.last_name)))
            resolve(owners)
        });
    })
}
exports.getAll = getAll;

const modify = (cc, firstname, lastname) => {
    return new Promise(function (resolve, reject) {
        mysql.query("UPDATE owner SET first_name = ?, last_name = ? WHERE cedula = ?",[firstname, lastname, cc], function (err, rows) {
            if (err)  return reject(err);
            resolve('Admin modified')
        });
    })
}
exports.modify = modify;

