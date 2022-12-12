import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            return getLoginStat();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getLoginStat(){
        
        const { size } = req.query;
        const loginStat = await db.loginStats.getPaginated({pagination: { size: 50 }});
              
        return res.status(200).json({loginStat});
    }
}