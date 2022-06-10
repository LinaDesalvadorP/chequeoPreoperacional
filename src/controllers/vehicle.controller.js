const vehicles = require('../models/manager/vehicle.manager');

const add = async (req, res) => {
    const {licensePlate, cc, movil, model, brand} = req.body;
    try{
    await vehicles.add(licensePlate, cc, movil, model, brand);
    return  res.status(200).json({message: 'Vehicle added'});
    }catch (e){
        return  res.status(402).json({error: e});
    }
};
module.exports.add = [add];
