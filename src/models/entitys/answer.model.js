class Answer{
    constructor(id, statement) {
        this.id = id
        this.statement = statement
    }
}

class SolvedSelectionAnswer{
    constructor(statement, selected) {
        this.statement = statement
        this.selected = selected
    }
}

class SolvedOpenAnswer{
    constructor(statement) {
        this.statement = statement
    }
}

module.exports= {
    answer: Answer,
    solvedSelectionAnswer: SolvedSelectionAnswer,
    solvedOpenAnswer: SolvedOpenAnswer,
};

