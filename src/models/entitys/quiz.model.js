class Quiz{
    constructor(id, movil, ownerName, licensePlate, presentation) {
        this.id = id
        this.movil = movil
        this.ownerName = ownerName
        this.licensePlate = licensePlate
        this.presentation = presentation
    }
}

module.exports= {
    quiz: Quiz,
};

