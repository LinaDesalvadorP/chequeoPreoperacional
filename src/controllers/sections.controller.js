const sections = require('../models/manager/section.manager')

const getAll = async (req, res) =>{
    const sectionsList = await  sections.getAllSections()
    res.status(200).send(sectionsList)
}
module.exports.getAll = [getAll];
