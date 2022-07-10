require('dotenv').config()
const mysql = require('mysql')


const { HOST, USER, PASSWORD, DATABASE } = process.env;

const connection = mysql.createConnection({
    host     : HOST,
    user     : USER,
    password : PASSWORD,
    database : DATABASE,
    multipleStatements: true
});


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

setInterval( () =>{
    connection.query("Select 10")
}, 27800)

setInterval(() =>{connection.query("call daily_random_questions")}, 1000 * 60 * 60 * 24)

module.exports = connection;


