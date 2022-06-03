import {db} from "../db/db";
import {Schedule} from "../types/Schedule";
import {CreateNewSchedule} from "../types/CreateNewSchedule";

export class ScheduleModel {
    private con;

    constructor() {
        this.con = new db().con;
        //console.log(this.con)
        console.log ("Connected to database")
    }

    async getSchedule(): Promise<Schedule[]> {
        //console.log (`SELECT * FROM \`schedule`);
        const [rows] = await this.con.query("SELECT * FROM `schedule`");
        return rows;
    }

    async scheduleByID(id): Promise<Schedule[]> {
       // console.log(`SELECT * FROM \`schedule\` WHERE \`id\`=${id}`)
        const [rows] = await this.con.query(`SELECT * FROM \`schedule\` WHERE \`id\`=${id}`);
        return rows;
    }

    async scheduleByGroupID(id): Promise<Schedule[]> {
        //console.log(`SELECT * FROM \`schedule\` WHERE \`groupID\`=${id}`)
        const [rows] = await this.con.query(`SELECT * FROM \`schedule\` WHERE \`groupID\`=${id}`);
        return rows;
    }

    async scheduleByLecturerID(id): Promise<Schedule[]> {
        //console.log(`SELECT * FROM \`schedule\` WHERE \`lecturerID\`=${id}`)
        const [rows] = await this.con.query(`SELECT * FROM \`schedule\` WHERE \`lecturerID\`=${id}`);
        return rows;
    }

    async scheduleByRoomID(id): Promise<Schedule[]> {
        //console.log(`SELECT * FROM \`schedule\` WHERE \`room\`=${id}`)
        const [rows] = await this.con.query(`SELECT * FROM \`schedule\` WHERE \`room\`=${id}`);
        return rows;
    }

    async addSchedule(createNewSchedule: CreateNewSchedule): Promise<boolean> {
        await this.con.execute("INSERT INTO `schedule`(groupID,year,month, date, startHour, endHour, disciplineID, classNumber, classType, hours, departmentID, lecturerID, room)" +
            "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            createNewSchedule.groupID,
            createNewSchedule.year,
            createNewSchedule.month,
            createNewSchedule.date,
            createNewSchedule.startHour,
            createNewSchedule.endHour,
            createNewSchedule.disciplineID,
            createNewSchedule.classNumber,
            createNewSchedule.classType,
            createNewSchedule.hours,
            createNewSchedule.departmentID,
            createNewSchedule.lecturerID,
            createNewSchedule.room
        ]);
        return true;
    }

    async updateSchedule(id: number, schData: any): Promise<boolean> {
        const updateSchDataArray = Object.entries(schData);
        let setStatement = "";
        let preparedStatementData = [];
        for (let i = 0; i < updateSchDataArray.length; i++) {
            setStatement += `${updateSchDataArray[i][0]} = ?`;
            setStatement += (i + 1 !== updateSchDataArray.length) ? ", " : " ";
            preparedStatementData.push(updateSchDataArray[i][1]);
        }
        preparedStatementData.push(id);
        await this.con.execute(`UPDATE schedule SET ${setStatement} WHERE id = ?`, preparedStatementData);
        return true;
    }

    async deleteSchedule(id: number): Promise<boolean> {
        await this.con.execute("DELETE FROM `schedule` WHERE id = ?", [id]);
        return true;
    }
}
