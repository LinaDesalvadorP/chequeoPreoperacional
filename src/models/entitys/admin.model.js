
class Admin{
    constructor(username, firstname, lastname, isBanned) {
        this.username =   username
        this.firstname = firstname
        this.lastname = lastname
        this.isBanned = isBanned
    }


}

module.exports= {
    admin:  Admin,
};
