import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { secret } from "../../../lib/secret";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

type registerRequest = {
    username: string;
    password: string;
    student_id?: string | undefined;
    major?: string;
    entry?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password, student_id, major, entry } = req.body as registerRequest;

    if (!username || !password) {
        return res.status(400).json({ message: "user_pass_empty" });
    }

    const user = await db.User.select(["username"]).filter({ username }).getFirst();

    if (user) {
        return res.status(409).json({ message: "username_taken" });
    }

    const hashedPassword = hashSync(password, 10);

    let userCreate: any = {
        username: "",
        role: {
            id: ""
        }
    };


    if (student_id && typeof student_id === "string") {

        if (!major || !entry) {
            return res.status(400).json({ message: "student_data_incomplete" });
        }

        const student = await db.Student.filter({ id: student_id }).getFirst();
        if (student) {
            return res.status(409).json({ message: "student_account_exists" });
        }

        await db.Student.create(student_id, {
            major,
            enrolled_year: Number(entry),
        });

        userCreate = await db.User.create({
            username,
            password: hashedPassword,
            student: student_id,
            role: {
                id: "student"
            },
        });
    } else {
        userCreate = await db.User.create({
            username,
            password: hashedPassword,
            role: {
                id: "public"
            },
        });
    }

    const token = sign({ username: userCreate.username, role: userCreate.role.id }, secret);

    res.status(200).json({ username: userCreate.username, role: userCreate.role.id, token });
}