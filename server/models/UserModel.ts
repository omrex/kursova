import {db} from '../db/db';
import {registerUser} from "../types/RegisterUser";
import {createAdmin} from "../types/CreateAdmin";

export class User {
    public name;
    public email;
    public password;
    public isAdmin;
    public _id;
    public conn;

    constructor(name, email, password, isAdmin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.conn = new db().con;
        console.log(this.conn)
    }
    async register(registerUser: registerUser): Promise<boolean> {
        await this.conn.execute("INSERT INTO `users` (name, email, password)" +
            "VALUES (?,?,?)", [
            registerUser.name,
            registerUser.password,
            registerUser.email
        ]);
        return true;
    }
    async createAdminUser(createAdmin: createAdmin): Promise<boolean> {
        await this.conn.execute("INSERT INTO `users` (name,email,password,isAdmin)"
            + "VALUES (?,?,?,?)", [
            createAdmin.name,
            createAdmin.password,
            createAdmin.email,
            1
        ]);
        return true;
    }

    async signIn() {
        const [rows] = await this.conn.query("SELECT * FROM `users`  WHERE email LIKE `${this.email}` AND password LIKE `${this.password}`");
        return rows;
    }


    async save(id) {
        const [updatedRows] = await this.conn.query("UPDATE users SET  name = `${this.name}`, email = `${this.email}`, password = `${this.password}` WHERE users.id = `${id}`");
        return updatedRows;
    }

    async findById(id) {
        const [newUser] = await this.conn.query("SELECT * FROM `users` WHERE id = `${id}`");
        return newUser;
        if (newUser.length == 1) {
            const user = new User(newUser[0].name,
                newUser[0].email,
                newUser[0].password,
                newUser[0].isAdmin);
            return user;
        }
        return null;
    }
}