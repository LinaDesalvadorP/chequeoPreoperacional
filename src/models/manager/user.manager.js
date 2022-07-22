const User = require('../entitys/user.model')
const mysql = require('../../config/config.database')


const exist = (userName) => {
    return new Promise(function (resolve, reject) {
        mysql.query("call user_exist(?,@exist); select @exist as value;", [userName], function (err, rows) {
            if (err) return  reject(err);
            rows[1].forEach(e => resolve(Boolean(e.value)))
        });
    })
}
exports.exist = exist;

const verifyUserAndPassword = (userName, password) => {
    return new Promise(function (resolve, reject) {
        mysql.query("call  verify_user_pass(?,?,@correct); select @correct as correct;", [userName, password], function (err, rows) {
            if (err) return  reject(err);
            rows[1].forEach(e => resolve(Boolean(e.correct)))
        });
    })
}
exports.verifyUserAndPassword = verifyUserAndPassword;


const getRol = (userName) =>{
    return new Promise(function (resolve, reject){
        mysql.query("call  get_rol(?,@rol); select @rol as rol;", [userName], function (err, rows) {
            if (err) return  reject(err);
            rows[1].forEach(e => resolve(e.rol))
        });
    })
}
exports.getRol = getRol;

const createUser = (idRol, username, password) => {
    return new Promise(function (resolve, reject){
        mysql.query("insert into user values (?,?,?,0)", [idRol, username, password], function (err, rows) {
            if (err) return  reject(err);
           resolve ('User created')
        });
    })
}
exports.createUser = createUser;

const banUser = (username) => {
    return new Promise(function (resolve, reject){
        mysql.query("UPDATE user SET is_banned = 1 WHERE user_name = ?", [username], function (err, rows) {
            if (err) return  reject(err);
            resolve ('User banned')
        });
    })
}
exports.banUser = banUser;

const unbanUser = (username) => {
    return new Promise(function (resolve, reject){
        mysql.query("UPDATE user SET is_banned = 0 WHERE user_name = ?", [username], function (err, rows) {
            if (err) return  reject(err);
            resolve ('User banned')
        });
    })
}
exports.unbanUser = unbanUser;

const isBanned = (username) => {
    return new Promise(function (resolve, reject){
        mysql.query("SELECT is_banned FROM user WHERE user_name = ?", [username], function (err, rows) {
            if (err) return  reject(err);
            resolve (Boolean(rows[0].is_banned))
        });
    })
}
exports.isBanned = isBanned;

const hasCheck = (username) => {
    return new Promise(function (resolve, reject){
        mysql.query("call has_check(?)", [username], function (err, rows) {
            if (err) return  reject(err);
            rows[0].forEach(e => resolve(Boolean(e.isCheck)))
        });
    })
}
exports.hasCheck = hasCheck;
