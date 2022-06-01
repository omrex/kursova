import {Request, Response} from "express";
import {ScheduleModel} from "../models/ScheduleModel";
import {CreateNewSchedule} from "../types/CreateNewSchedule";
import {User} from '../models/UserModel';
import {registerUser} from "../types/RegisterUser";
import {createAdmin} from "../types/CreateAdmin";

const schModel = new ScheduleModel()
const userModel = new User("","","","")


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
        await schModel.addSchedule(create_new_sch);
        res.send({
            message: "Success"
        })
    } catch (error) {
        res.status(403).send({
            message: "Create not successful"
        })
    }

}

export const  scheduleByGroupID = async (req: Request, res: Response) => {
    const id=+req.params.id;
    try {
        res.send(await schModel.scheduleByGroupID(id));
    } catch (error) {
        res.status(403).send({
            message: "No schedule found"
        })
    }
}

export const  scheduleByLecturerID = async (req: Request, res: Response) => {
    const id=+req.params.id;
    try {
        res.send(await schModel.scheduleByLecturerID(id));
    } catch (error) {
        res.status(403).send({
            message: "No schedule found"
        })
    }
}

export const  scheduleByRoomID = async (req: Request, res: Response) => {
    const id=+req.params.id;
    try {
        res.send(await schModel.scheduleByRoomID(id));
    } catch (error) {
        res.status(403).send({
            message: "No schedule found"
        })
    }
}

export const allSchedule = async (req: Request, res: Response) => {
    try {
        res.send(await schModel.getSchedule());
    } catch (error) {
        res.status(403).send({
            message: "No schedule found"
        })
    }
}

export const updateSchedule = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const techData = req.body;
        await schModel.updateSchedule(id, techData);
        res.status(200).send({
            message: "Success"
        })
    } catch (e) {
        console.log({e})
        res.status(403).send({
            message: "Failed to update schedule"
        })
    }
}

export const deleteSchedule = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await schModel.deleteSchedule(id);
        res.status(200).send({
            message: "Success"
        })
    } catch (e) {
        res.status(403).send({
            message: "Failed to delete schedule"
        })
    }
}

export const createAdminUser = async (req: Request, res:Response) => {
    try {
        const createAdmin: createAdmin = {
            name: "admin",
            email: "admin@admin.com",
            password: "root",
            isAdmin: 1
        };
        await userModel.createAdminUser(createAdmin);
        res.send({
            message: "Success"
        })
    } catch (error) {
        res.status(403).send ({
            message: "Create of Admin User didn't work"
        })
    }
}

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

export const register = async (req: Request, res: Response) => {
    try {
        const registerUser: registerUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        await userModel.register(registerUser);
        res.send({
            message: "Successful registration"
        })
    } catch (error) {
        res.status(403).send({
            message: "Register not successful"
        })
    }
}

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