const mysql = require('mysql2');

export class db {
    public con;
    constructor() {
        const pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "vvmu"
        })
        this.con=pool.promise();
    }

}