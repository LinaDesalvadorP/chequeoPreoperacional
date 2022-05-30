const users = require('../models/users.model');

const login = async (req, res) => {
    const { username, password } = req.body;

    let exist = await users.exist(username);
    if (!exist) return res.status(404).send({message:"User doesn't exist"});

    let verifyUserAndPass = await  users.verifyUserAndPassword(username,password);
    if (!verifyUserAndPass) return  res.status(401).send({message:"Incorrect password"});

    return  res.status(200).json({ message: "Ok" });
};
module.exports.login = [login];

