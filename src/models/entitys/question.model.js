class Question {
    constructor(id, statement, section,type, answerOptions) {
        this.id = id
        this.statement = statement
        this.section = section
        this.type = type
        this.answerOptions = answerOptions
    }
}


class SolvedOpenQuestion {
    constructor(id,statement, section, type, solvedOpenAnswer) {
        this.id = id
        this.type = type
        this.statement = statement
        this.section = section
        this.solvedOpenAnswer = solvedOpenAnswer
    }
}

class SolvedSelectionQuestion {
    constructor(id, statement, section, type, answerOptions) {
        this.id = id
        this.type = type
        this.statement = statement
        this.section = section
        this.answerOptions = answerOptions
    }
}

module.exports= {
    question: Question,
    solvedOpenQuestion: SolvedOpenQuestion,
    solvedSelectionQuestion: SolvedSelectionQuestion
};


