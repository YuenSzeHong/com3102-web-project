// import { LoginRecord } from './../../types';
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
// import type { LoginStat } from "../../types";
import { secret } from "../../lib/secret";
import db from "../../lib/db";




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

    async function getLoginStat() {

        // get token from headers
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: "no token" });
        }

        jwt.verify(token, secret, async (err, decoded) => {
            if (err || !decoded) {
                return res.status(400).json({ message: "Invalid token" });
            }

            const { username } = decoded as JwtPayload;
            const user = await db.User.filter({ username: username }).getFirst();

            if (!user) {
                return res.status(401).json({ message: "Invalid token" });
            }

            if (!user.role) {
                return res.status(403).json({ message: "Invalid token" });
            }

            if (user.role.id !== "admin") {
                return res.status(403).json({ message: "You are not authorized to access this" });
            }
        })
        const records = await db.loginStats.select(["id", "login_date", "login_ip", "remarks", "success", "user.username"]).sort("login_date", "desc").getAll();

        return res.status(200).json(records);
    }
}
