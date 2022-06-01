import {Request, Response} from "express";
import {ScheduleModel} from "../models/ScheduleModel";
import {CreateNewSchedule} from "../types/CreateNewSchedule";
import {User} from '../models/UserModel';
import {registerUser} from "../types/RegisterUser";
import {createAdmin} from "../types/CreateAdmin";

//създаваме 2 константи, едната инстанция на класа  WhiteModel, а другата на класа User
const productModel = new ScheduleModel()
const userModel = new User("","","","")

//ще връща всички продукти
export const getAllSchedule = async (req: Request, res: Response) => {
    try {
        res.send(await productModel.getSchedule());
    } catch (error) {
        res.status(403).send({
            message: "No products found"
        })
    }
}

//ще дава възможност да се добави нова бяла техника
export const addSchedule = async (req: Request, res: Response) => {
    try {
        const create_new_sch: CreateNewSchedule = {
            groupID:+req.query.id,
            year:+req.query.year,
            month:+req.query.month,
            date:+req.query.date,
            startHour:+req.query.startHour,
            endHour:+req.query.endHour,
            disciplineID:+req.query.disciplineID,
            classNumber:+req.query.classNumber,
            classType:+req.query.classType,
            hours:+req.query.hours,
            departmentID:+req.query.departmentID,
            lecturerID:+req.query.lecturerID,
            room:+req.query.room
        };
        await productModel.addSchedule(create_new_sch);
        res.send({
            message: "Success"
        })
    } catch (error) {
        res.status(403).send({
            message: "Create not successful"
        })
    }

}
//ще изведе продукт по дадено ИД na kategoriq
export const  scheduleByGroupID = async (req: Request, res: Response) => {
    const id=+req.params.id;
    try {
        res.send(await productModel.scheduleByGroupID(id));
    } catch (error) {
        res.status(403).send({
            message: "No products found"
        })
    }
}

export const  scheduleByLecturerID = async (req: Request, res: Response) => {
    const id=+req.params.id;
    try {
        res.send(await productModel.scheduleByLecturerID(id));
    } catch (error) {
        res.status(403).send({
            message: "No products found"
        })
    }
}

export const  scheduleByRoomID = async (req: Request, res: Response) => {
    const id=+req.params.id;
    try {
        res.send(await productModel.scheduleByRoomID(id));
    } catch (error) {
        res.status(403).send({
            message: "No products found"
        })
    }
}

//ще върне всички категории
export const allSchedule = async (req: Request, res: Response) => {
    try {
        res.send(await productModel.getSchedule());
    } catch (error) {
        res.status(403).send({
            message: "No categories found"
        })
    }
}

//ще се ъпдейтне бялата техника
export const updateSchedule = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const techData = req.body;
        await productModel.updateSchedule(id, techData);
        res.status(200).send({
            message: "Success"
        })
    } catch (e) {
        console.log({e})
        res.status(403).send({
            message: "Failed to update product"
        })
    }
}

//ще се изтрие бялата техника
export const deleteSchedule = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await productModel.deleteSchedule(id);
        res.status(200).send({
            message: "Success"
        })
    } catch (e) {
        res.status(403).send({
            message: "Failed to delete product"
        })
    }
}

//създава се администраторски профил
export const createAdminUser = async (req: Request, res:Response) => {
    try {
        const createAdmin: createAdmin = {
            name: "Dory",
            email: "email@dory.com",
            password: "1234",
            isAdmin: 1
        };
        await userModel.createAdminUser(createAdmin);
        res.send({
            message: "Success"
        })
    } catch (error) {
        res.status(403).send ({
            message: "Create of Admin User Not Successfull"
        })
    }
}

//създава се възможност за логване с имейл и парола
export const signIn = async (req: Request, res:Response) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;

        const u = new User("", email, pass, "");

        const result = await u.signIn();

        if (result.length == 1) {
            const foundUser = result[0];

            res.send({
                _id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                isAdmin: foundUser.isAdmin
            });
        } else {
            res.status(401).send({
                message: 'Invalid Email or Password.'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Invalid Email or Password.'
        });
    }
}

//регистрирането става с име, имейл, парола
export const register = async (req: Request, res: Response) => {
    try {
        const registerUser: registerUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        await userModel.register(registerUser);
        res.send({
            message: "Successfull registration"
        })
    } catch (error) {
        res.status(403).send({
            message: "Register not successful"
        })
    }
}

//намира потребител по номер
export const getById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        await user.save(userId);

        res.send({
            _id: userId,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404).send({
            message: 'User Not Found'
        });
    }


}