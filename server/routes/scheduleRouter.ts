import {Router} from "express";
import {
    addSchedule,
    scheduleByGroupID,
    scheduleByLecturerID,
    scheduleByRoomID,
    allSchedule,
    updateSchedule,
    deleteSchedule

} from "../controllers/ScheduleController";

export const scheduleRouter = Router();

scheduleRouter.post("/addSchedule", addSchedule);
scheduleRouter.get("/schedule/group/:id", scheduleByGroupID);
scheduleRouter.get("/schedule/lecturer/:id", scheduleByLecturerID);
scheduleRouter.get("/schedule/room/:id", scheduleByRoomID);
scheduleRouter.get("/allSchedule", allSchedule);
scheduleRouter.put("/schedule/:id", updateSchedule);
scheduleRouter.delete("/schedule/:id", deleteSchedule);