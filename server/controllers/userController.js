const mysql = require('mysql');

// Database
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Add User 
// exports.display = (req, res) => {
//     res.render("projects");

// }

exports.send = (req, res) => {

    // res.render("add");
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as ID " + connection.threadId);

        let name = req.body.name;
        let email = req.body.email;
        let comment = req.body.comment;
        connection.query(`insert into contact(name,email,message) values("${name}","${email}","${comment}")`, (err, rows) => {
            connection.release();
            if (!err) {
                res.render("index");
                console.log("Inserted!!!");
            } else {
                console.log(err);
            }
        });
    });

}
