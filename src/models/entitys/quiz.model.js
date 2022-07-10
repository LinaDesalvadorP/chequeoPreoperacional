class Quiz{
    constructor(id, movil, ownerName, licensePlate, presentation) {
        this.id = id
        this.movil = movil
        this.ownerName = ownerName
        this.licensePlate = licensePlate
        this.presentation = new Date(presentation).toLocaleDateString()
    }
}

module.exports= {
    quiz: Quiz,
};

