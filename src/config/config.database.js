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

setInterval(function (){
    connection.query('SET GLOBAL connect_timeout=86400')
    connection.query('SET GLOBAL interactive_timeout=86400')
    connection.query('SET GLOBAL wait_timeout=86400')
}, 86400000)


module.exports = connection;


