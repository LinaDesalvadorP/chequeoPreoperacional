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
    console.log('connected');
});

module.exports = connection;


