class QuizListFormat{
    constructor(id,movil, name, license_plate, presentation) {
        this.id = id
        this.movil = movil
        this.name = name
        this.license_plate = license_plate
        this.presentation = presentation
    }
}

class Quiz{
    constructor(type, sections) {
        this.type = type
        this.sections = sections
    }
}

module.exports= {
    quizListFormat: QuizListFormat,
    quiz: Quiz
};

