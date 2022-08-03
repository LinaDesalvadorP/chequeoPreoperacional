class Alert{
    constructor(id, movil, statement, data_alert, is_solved ) {
        this.id = id
        this.movil = movil
        this.statement = statement
        this.data_alert = data_alert
        this.is_solved = is_solved
    }
}

module.exports= {
    alert: Alert,
};
