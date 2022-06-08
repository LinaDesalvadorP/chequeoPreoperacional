class Question {
    constructor(id, statement, section, type, answerOptions) {
        this.id = id
        this.statement = statement
        this.section = section
        this.type = type
        this.answerOptions = answerOptions
    }
}

module.exports= {
    question: Question,
};


