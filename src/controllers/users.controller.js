const users = require('../models/users.model');

const login = async (req, res) => {
    const { username, password } = req.body;

    console.log(username + '   ' + password)

    const exist = await users.exist(username);
    if (!exist) return res.status(404).send({message:"User doesn't exist"});

    const verifyUserAndPass = await  users.verifyUserAndPassword(username,password);
    if (!verifyUserAndPass) return  res.status(401).send({message:"Incorrect password"});

    const  userRol = await  users.getRol(username);

    return  res.status(200).json({ rol: userRol});
};
module.exports.login = [login];

