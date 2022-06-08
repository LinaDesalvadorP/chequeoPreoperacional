const owners = require('../models/manager/owner.manager');

const getOwner = async(req, res) =>{
    const  cc  = req.params.cc;
    console.log(cc)
    try {
        const owner = await owners.get(cc)
        return res.status(200).json(owner)
    }catch (e){
        return res.status(404).json({error: e})
    }
}
module.exports.getOwner = [getOwner];

const add = async (req, res) => {
    const {cc, firstname, lastname} = req.body;
    try{
        await owners.add(cc, firstname, lastname)
        return  res.status(200).json({message: 'Vehicle added'});
    }catch (e){
        return  res.status(402).json({error: e});
    }
};
module.exports.add = [add];
