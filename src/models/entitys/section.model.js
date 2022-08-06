class Section {
    constructor(name, path, questions = []) {
        this.name = name
        this.path = path
        this.questions  = questions
    }
}

class SectionList {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

module.exports= {
    section: Section,
    sectionList: SectionList
};
