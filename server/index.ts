import { Application, Request, Response } from "express";
let cors = require('cors')
let express=require("express")
const app: Application = express();

const port: number = 3001;
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to VVMU schedule." });
});
require("./app/routes/tutorial.routes.js")(app);



app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
});

let mysql = require('mysql2');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vvmu"
});

// open the MySQL connection
con.connect(function(err) {
    if (err) throw err;
   {
        if (err) throw err;
        console.log('Database is connected');
    }
});
module.exports = con;

//var selectQuery = 'SELECT * FROM `schedule` where groupID=12691&& year=2022 &&month=4 &&date=29';


app.get('/vvmu',(req, res) => {
    let my_query = req.query.query
    console.log(my_query);
    con.connect(function(err) {
        if(err) throw err;
        else {
            con.query(
                my_query,
                function select(error, result, fields) {
                if(err) {
                    console.log(err);
                    res.json({"error":true});
                }
                else {
                    console.log(result);
                    res.json(result);
                }
            });
        }
    });
});