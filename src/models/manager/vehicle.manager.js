const mysql = require('../../config/config.database')
const vehicle = require('../entitys/vehicle.model')
const Vehicle = vehicle.vehicle

const add = (license_plate, cc, movil, model, brand) => {
    return new Promise(function (resolve, reject) {
        mysql.query("INSERT INTO vehicle VALUES (?,?,?,?,?);", [license_plate,cc,movil,model,brand], function (err, rows) {
            if (err)  return reject(err);
            resolve('Vehicle added')
        });
    })
}
exports.add = add;

const exist = (movil) => {
    return new Promise(function (resolve, reject) {
        mysql.query("CALL movil_exist(?, @exist); SELECT @exist as exist", [movil], function (err, rows) {
            if (err)  return reject(err);
            rows[1].forEach(e=> resolve(Boolean(e.exist)))
        });
    })
}
exports.exist = exist;

const getAll = () => {
    return new Promise(function (resolve, reject) {
        let vehicles = []
        mysql.query("CALL get_vehicles", function (err, rows) {
            if (err)  return reject(err);
            rows[0].forEach(e=> vehicles.push(new Vehicle(e.license_plate, e.cedula, e.movil)))
            resolve(vehicles)
        });
    })
}
exports.getAll = getAll;

const get = (licensePlate) => {
    return new Promise(function (resolve, reject) {
        mysql.query("select * from vehicle where license_plate = ?", [licensePlate], function (err, rows) {
            if (err) return  reject(err);
            resolve(new Vehicle(rows[0].license_plate, rows[0].cedula, rows[0].movil, rows[0].model, rows[0].brand))
        });
    })
}
exports.get = get;

const modify = (licensePlate, cc, movil, model, brand) => {
    return new Promise(function (resolve, reject) {
        mysql.query("UPDATE owner SET license_plate = ?, cc = ?, movil = ?, model = ?, brand = ? WHERE licensePlate = ?",[licensePlate, cc, movil, model, brand], function (err, rows) {
            if (err)  return reject(err);
            resolve('Admin modified')
        });
    })
}
exports.modify = modify;
