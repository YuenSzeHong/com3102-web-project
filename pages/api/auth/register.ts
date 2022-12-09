import type { NextApiRequest, NextApiResponse } from "next";
import type { StudentRecord } from "../../../lib/xata";
import db from "../../../lib/db";
import { secret } from "../../../lib/secret";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

type registerRequest = {
    username: string;
    password: string;
    studentid?: string | undefined;
    major?: string;
    name?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password, studentid, major, name } = req.body as registerRequest;

    if (!username || !password) {
        return res.status(400).json({ message: "username/password missing" });
    }

    const user = await db.User.select(["username"]).filter({ username }).getFirst();

    if (user) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = hashSync(password, 10);


    if (studentid !== undefined) {
        const student = await db.Student.filter({ id: studentid }).getFirst();
        if (student) {
            return res.status(409).json({ message: "You Already registered a account here" });
        }

        await db.Student.create(studentid, {
            major,
            name,
        });

        await db.User.create({
            username,
            password: hashedPassword,
            student: studentid,
        });
    } else {
        await db.User.create({
            username,
            password: hashedPassword,
        });
    }


    const token = sign({ username }, secret);

    res.setHeader("Set-Cookie", [`token=${token}`, "HttpOnly"]);

    res.status(200).json({ token });
}