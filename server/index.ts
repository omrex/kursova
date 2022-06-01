const express = require("express");
import {Application, json} from "express";
import {scheduleRouter} from "./routes/scheduleRouter";
const cors = require("cors");
import {userRouter} from "./routes/UserRouter";

const app: Application = express();
app.use(json());
app.use(cors());
app.use("/api", scheduleRouter);
app.use('/api/users', userRouter);

export const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({
        message: 'Not admin.' });
};

app.listen(3002, () => {
    console.log(`Server is listening on 3002!`)
})