import { Router, Request, Response } from "express";
import * as admin from "firebase-admin"; // npm install firebase-admin --save
import {
    createUser,
    getAllUsers,
    readUser,
} from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";
import axios, { AxiosError } from "axios";

export const UserRouter = Router();

UserRouter.get(
    "/",
    isAuthenticated,
    isAuthorized({ roles: ["admin"], allowSameUser: true }),
    async (req: Request, res: Response) => {
        try {
            const listedUsers = await getAllUsers();

            res.status(200).send({ listedUsers });
        } catch (error) {
            res.status(400).send({ error});
        }
    }
);

UserRouter.post("/user", async (req: Request, res: Response) => {
    const { displayName, email, password } = req.body;

    if (!displayName || !email || !password) {
        return res.status(400).send({ error: "Missing or incorrect fields" });
    }

    try {
        const UserId = await createUser(
            displayName,
            email,
            password,
            "user"
        );

        res.status(201).send({
            success: "user created successfully!",
            id: UserId,
        });
    } catch (error) {
        res
            .status(500)
            .send({ error: "Something went wrong" });
    }
});
UserRouter.get(
    "/:userId",
    isAuthenticated,
    isAuthorized({
        roles: ["admin"],
        allowSameUser: true,
    }),
    async (req: Request, res: Response) => {
        const id: string = req.params["userId"];

        if (+id <= 0) {
            return res.status(400).send({
                error: "Invalid id",
            });
        }

        try {
            const fetchedUser = await readUser(id);

            res.status(200).send({ fetchedUser });
        } catch (error) {
            res
                .status(400)
                .send({
                    error: "Couldn't read user",
                });
        }
    }
);

UserRouter.post("/admin/signin", async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).send({ error: "Missing fields" });
    };

    try {
        const decodedToken: admin.auth.DecodedIdToken =
            await admin.auth().verifyIdToken(token);
        if (!decodedToken) return res.status(401).send({
            error: "No authentication"
        });
        if (decodedToken.role !== "admin") {
            return res.status(401).send({
                error: "No Admin credential"
            });
        };
        res.status(200).send(decodedToken);


    } catch (error: AxiosError | any) {
        console.log(error);
        res.status(401).send({ 
            error,
            message: "Bad Credentials" });
    }
});