class Question {
    constructor(id, statement, section,type,recommendation, answerOptions  ) {
        this.id = id
        this.statement = statement
        this.section = section
        this.type = type
        this.recomendation = recommendation
        this.answerOptions = answerOptions
    }
}

class QuestionInfo {
    constructor(id, statement, section,type,frecuency,recommendation, answerOptions  ) {
        this.id = id
        this.statement = statement
        this.section = section
        this.type = type
        this.frecuency = frecuency
        this.recomendation = recommendation
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

class QuestionList {
    constructor(id, statement, type, frecuency) {
        this.id = id
        this.statement = statement
        this.type = type
        this.frecuency = frecuency
    }
}

module.exports= {
    question: Question,
    solvedOpenQuestion: SolvedOpenQuestion,
    solvedSelectionQuestion: SolvedSelectionQuestion,
    questionInfo: QuestionInfo,
    questionList: QuestionList
};


