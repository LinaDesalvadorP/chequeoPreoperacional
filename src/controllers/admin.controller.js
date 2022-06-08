const admins = require('../models/manager/admin.manager');

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
        return  res.status(402).json({error: e});
    }
};
module.exports.add = [add];

