import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { secret } from "../../../lib/secret";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            return getEvent();
        case 'POST':
            return createEvent();
        case 'DELETE':
            return deleteEvent();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function createEvent(){
        const { date, title, module } = req.body;
        const eventCreate = await db.events.create({
        occur_due: new Date(date),
        title: title,
        module: module,
      });
      return res.status(200).json({eventCreate});
    }
    
    async function getEvent(){
        /*if (!req.cookies.token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        jwt.verify(req.cookies.token, secret, async (err, decoded) => {
            if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
            const { username } = decoded as JwtPayload;
            const enrolled_modules = db.User.select(["id", "student.enrolled_module", "student.id"]).filter({ username }).student.enrolled_module;
            const module_events = await Promise.all([enrolled_modules.map((module) => {
                return db.events.select(["id", "occur_due", "title", "module.id"]).filter({ "module.id": module.id });
            })]);
            module_events.reduce((acc, val) => acc.concat(val), []);
        })
        */

        //student can read their results of their enrolled modules
        /*jwt.verify(req.cookies.token, secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            
            const { username } = decoded as JwtPayload;
            const student = await db.User.select(["student.id"]).filter({ username }).getFirst();
            if(!student){
                return res.status(401).json({ message: "Only student can check there own result" });
            }
            else{
                const module = await db.Student.select(["enrolled_module"]).filter("id", student.id).getAll();  

                const eventRead = await db.events.select(["*"]).filter({"module.id" : module.id}).getAll();
                return res.status(200).json(eventRead);
            }
            
        });
        */
        const readEvent = await db.events.select(["occur_due", "title", "module.*"]).getAll();
        return res.status(200).json({readEvent});
    }

    async function deleteEvent(){
        const { id } = req.body;
        const record = await db.events.delete(id);
    }
    
}