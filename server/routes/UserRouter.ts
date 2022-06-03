import {Router} from "express";
import { createAdminUser, signIn, register, getById} from "../controllers/ScheduleController";

export const userRouter = Router();

userRouter.post('/createAdmin', createAdminUser);
userRouter.get('/signIn', signIn);
userRouter.post('/register', register);
userRouter.put('/:id', getById);