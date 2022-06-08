class Section {
    constructor(name, path, questions = []) {
        this.name = name
        this.path = path
        this.questions  = questions
    }
}

module.exports= {
    section: Section,
};
