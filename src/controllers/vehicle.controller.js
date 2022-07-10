const vehicles = require('../models/manager/vehicle.manager');

const add = async (req, res) => {
    const {licensePlate, cc, movil, model, brand} = req.body;
    const exist = await vehicles.exist(movil)
    if (exist) return res.status(402).json({message: 'Movil already exist'})
    await vehicles.add(licensePlate, cc, movil, model, brand);
    return  res.status(200).json({message: 'Vehicle added'});
};
module.exports.add = [add];

const modify = async (req, res) => {
    const {licensePlate, cc, movil, model, brand} = req.body;
    await vehicles.modify(licensePlate,cc,movil,model,brand)
    return  res.status(200).json({message: 'Vehicle modified'});
};
module.exports.modify = [modify];

const getAll = async (req, res) => {
    const vehicleList = await  vehicles.getAll()
    res.status(200).json(vehicleList)
};
module.exports.getAll = [getAll];

const get = async (req, res) => {
    const  licensePlate  = req.params.licensePlate;
    const vehicle = await vehicles.get(licensePlate)
    return res.status(200).json(vehicle)
};
module.exports.get = [get];
