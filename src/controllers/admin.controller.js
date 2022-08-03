const admins = require('../models/manager/admin.manager');
const alerts = require('../models/manager/alert.manager')

const getAdmin = async(req, res) =>{
    const  username  = req.params.username;
    try {
        const admin = await admins.get(username)
        return res.status(200).json(admin)
    }catch (e){
        return res.status(404).json({error: e})
    }
}
module.exports.getAdmin = [getAdmin];



const add = async (req, res) => {
    const {username, firstname, lastname} = req.body;
    try{
        await admins.add(username, firstname, lastname)
        return  res.status(200).json({message: 'Admin added'});
    }catch (e){
        return  res.status(401).json({error: e});
    }
};
module.exports.add = [add];


const getAll = async (req, res) => {
    const adminsList = await admins.getAll()
    return res.status(200).json(adminsList)
};
module.exports.getAll = [getAll];

const getAlerts = async (req, res) => {
    const alertList = await alerts.getAll()
    return res.status(200).json(alertList)
};
module.exports.getAlerts = [getAlerts];




