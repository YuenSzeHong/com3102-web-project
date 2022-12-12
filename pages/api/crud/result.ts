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
            return getResult();
        case 'POST':
            return createResult();
        case 'DELETE':
            return deleteResult();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getResult(){
        if (!req.cookies.token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        //student can read their results of their enrolled modules
        jwt.verify(req.cookies.token, secret, async (err, decoded) => {
            const { username } = decoded as JwtPayload;
            const student = await db.User.select(["student.id"]).filter({ username }).getFirst();
            if(!student){
                return res.status(401).json({ message: "Only student can check there own result" });
            }
            else{
                const resultRead = await db.examResult.select(["module_id.title", "year", "semester", "score"]).filter({"student_id.id" : student.id}).getAll();
                return res.status(200).json(resultRead);
            }
            
        });
    }
    

    async function createResult(){
        const { module, student, sem, year, score} = req.body;
        const record = await db.examResult.create({
            module_id: module,
            student_id: student,
            semester: sem,
            year: year,
            score: score,
          });
        return res.status(200).json(record);
    }

    async function deleteResult(){
        const { id } = req.body;
        const record = await db.examResult.delete(id);
        console.log(record); 
    }
        

}



