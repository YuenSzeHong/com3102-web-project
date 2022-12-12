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
            return getModule();
        case 'POST':
            return createModule();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getModule(){
        if (!req.cookies.token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        jwt.verify(req.cookies.token, secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            
            const { username } = decoded as JwtPayload;
            const student = await db.User.select(["student.id"]).filter({ username }).getFirst();
            if(!student){
                return res.status(401).json({ message: "Only student can check there own module" });
            }
            else{
                const moduleRead = await db.Student.select(["enrolled_module", "id"]).filter({"id" : student.id}).getAll();
                return res.status(200).json(moduleRead);
            }
            
        });
    }

    async function createModule(){
        const { module_title, module_des } = req.body;
        const moduleCreate = await db.Modules.create({        
        title: module_title,
        description: module_des,
        });
        return res.status(200).json(moduleCreate);
    }
}

    