import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            return getAvg();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    async function getAvg() {

        const { module_id } = req.query;

        if (!module_id) {
            return res.status(400).json({ message: "module not found" });
        }
        else {
            const records = await db.examResult
                .select(["score", "module_id.id"]).filter("module_id.id", module_id as string)
                .getAll();

            const sum = records.reduce((acc, cur) => acc + cur.score, 0);
            const avg = sum / records.length;
            return res.status(200).json({ avg });
        }
    }
}