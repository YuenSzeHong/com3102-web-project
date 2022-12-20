import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import { secret } from "../../lib/secret";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            return getProduct();
        case 'PUT':
            return createProduct();
        case 'DELETE':
            return deleteProduct();

        case 'PATCH':
            return updateProduct();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    async function getProduct() {
        const { keyword } = req.query;


        const token = req.headers.authorization?.split(' ')[1];
        let check = false;
        if (token) {
            await jwt.verify(token, secret, async (err, decoded) => {
                const { username } = decoded as JwtPayload;
                const user = await db.User.select(["role.id", "student.id"]).filter({ username }).getAll();
                if (user[0]) {
                    check = user[0].role?.id === "admin" || !!user[0].student?.id;
                }
            });
        }
        const products = (keyword ? await db.Products.search(keyword as string) : await db.Products.getAll()).map((product) => {
            const student_price = check ? product.student_price : undefined
            return {
                ...product,
                student_price
            }
        });
        return res.status(200).json(products);
        // res.status(400).json({ check })


    }



    function createProduct() {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const { username } = decoded as JwtPayload;
            const user = await db.User.select(["role"]).filter({ username }).getFirst();
            const { title, description, price, student_price } = req.body;

            if (!user) {
                return res.status(401).json({ message: "User not Exists" });
            }

            if (user.role?.create_products) {
                await db.Products.create({
                    title,
                    description,
                    price,
                    student_price: student_price || null,
                });
            }
        });
        return res.status(201).json({ message: "created" });

    }
    async function deleteProduct() {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const { username } = decoded as JwtPayload;
            const user = await db.User.select(["role.*"]).filter({ username }).getFirst();
            if (!user) {
                return res.status(401).json({ message: "User not Exists" });
            }
            if (user.role?.id !== "admin") {
                return res.status(401).json({ message: "no perms" });
            }
            const { id } = req.body;
            await db.Products.delete(id);
        })
        return res.status(200).json({ message: "deleted" });
    }

    function updateProduct() {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const { username } = decoded as JwtPayload;
            const user = await db.User.select(["role.*"]).filter({ username }).getFirst();
            if (!user) {
                return res.status(401).json({ message: "User not Exists" });
            }
            if (user.role?.id !== "admin") {
                return res.status(401).json({ message: "no perms" });
            }
            const { id, title, description, price, student_price } = req.body;
            console.log('update', req.body)
            await db.Products.update(id, {
                title,
                description,
                price,
                student_price,
            });
        })
        res.status(200).json({ message: "success" })
    }
}

