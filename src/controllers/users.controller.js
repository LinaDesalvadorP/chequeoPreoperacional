const users = require('../models/manager/user.manager');

const login = async (req, res) => {
    const { username, password } = req.body;

    const exist = await users.exist(username);
    if (!exist) return res.status(404).send({error:"User doesn't exist"});

    const verifyUserAndPass = await  users.verifyUserAndPassword(username,password);
    if (!verifyUserAndPass) return  res.status(401).send({error:"Incorrect password"});

    const isBanned = await users.isBanned(username);
    if (isBanned) return  res.status(401).send({error: "User is banned"})


    const hasCheck = await  users.hasCheck(username)
    if (hasCheck) return  res.status(401).send({error: "User already checked"})

    const  userRol = await  users.getRol(username);

    return  res.status(200).json({rol: userRol});
};
module.exports.login = [login];

const exist = async (req, res) => {
    const username = req.params.userId
    const exist = await users.exist(username);
    if (!exist) return res.status(404).send({error:"User doesn't exist"});
    return  res.status(200).send({message: "User exist"});
}
module.exports.exist = [exist];

const create = async(req, res) => {
    const {idRol, username, password} = req.body
    const exist = await users.exist(username);
    if (exist) return res.status(401).send({error:"User already exist"});
    await users.createUser(idRol, username, password)
    return res.status(200).send({message: 'User added'})
}
module.exports.create = [create];

const banUser = async(req, res) =>{
    const {username} = req.body
    const exist = await users.exist(username);
    if (!exist) return res.status(404).send({error:"User doesn't exist"});

    await users.banUser(username)

    return  res.status(200).json({message: "User banned"});
}
module.exports.banUser = [banUser];

const unbanUser = async(req, res) =>{
    const {username} = req.body
    const exist = await users.exist(username);
    if (!exist) return res.status(404).send({error:"User doesn't exist"});

    await users.unbanUser(username)

    return  res.status(200).json({message: "User unbanned"});
}
module.exports.unbanUser = [unbanUser];
