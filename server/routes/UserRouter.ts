import {Router} from "express";
import { createAdminUser, signIn, register, getById} from "../controllers/ScheduleController";

export const userRouter = Router();

userRouter.get('/createadmin', createAdminUser);
userRouter.post('/signin', signIn);
userRouter.post('/register', register);
userRouter.put('/:id', getById);