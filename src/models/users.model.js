const mysql = require('../config/config.database')

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
