import { Router, Request, Response } from "express";
import * as admin from "firebase-admin"; // npm install firebase-admin --save
import {
  createUser,
  disableUser,
  getAllUsers,
  readUser,
  updateUser,
} from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";
import { AxiosError } from "axios";
import { User } from "../models/userModel";

export const UserRouter = Router();

UserRouter.get("/",
isAuthenticated,
isAuthorized({ roles: ["admin","superadmin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const listedUsers = await getAllUsers();

      res.status(200).send({ listedUsers });
    } catch (error) {
      res.status(400).send({ error: "Couldn't list users. Verify the route" });
    }
  }
);

UserRouter.post("/newUser", async (req: Request, res: Response) => {
  const { displayName, email, password } = req.body;

  if (!displayName || !email || !password) {
    return res.status(400).send({ error: "Missing or incorrect fields" });
  }

  try {
    const newUser = await createUser(displayName, email, password,"user");
    const newUserUid = new User({ user_id: newUser });
    await newUserUid.save();

    res.status(201).send({
      success: "User created successfully!",
      user_id: newUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "Something went wrong",
    });
  }
  }
);

  UserRouter.get(
    "/:userId",
  isAuthenticated,
  isAuthorized({ roles: ["admin","superadmin"], allowSameUser: true }),
    async (req: Request, res: Response) => {
      const userId: string = req.params["userId"];

      if (+userId <= 0) {
        return res.status(400).send({
          error: "Invalid id",
        });
      }

      try {
        const fetchedUser = await readUser(userId);

        res.status(200).send({ fetchedUser });
      } catch (error) {
        res
          .status(400)
          .send({
            error: "Couldn't read user. The requested route doesn't exist",
          });
      }
    }
  );

  UserRouter.put(
    "/:userId",
  isAuthenticated,
  isAuthorized({ roles: ["admin","superadmin"], allowSameUser: true }),
    async (req: Request, res: Response) => {
      const userId: string = req.params["userId"];

      if (+userId <= 0) {
        return res.status(400).send({
          error: "Invalid id",
        });
      }
      const { displayName, email, password } = req.body;

      if (!displayName || !email || !password) {
        return res.status(400).send({ error: "Missing or incorrect fields" });
      }

      try {
        const updatedUser = await updateUser(
          userId,
          displayName,
          email,
          password);

        res.status(200).send({ updatedUser });
      } catch (error) {
        res
          .status(400)
          .send({ error: "Couldn't update user. Verify the requested user ID" });
      }
    }
  );

  UserRouter.delete(
    "/:userId",
  isAuthenticated,
  isAuthorized({ roles: ["admin","superadmin"], allowSameUser: true }),
    async (req: Request, res: Response) => {
      const userId: string = req.params["userId"];
      const userInfo = await admin.auth().getUser(userId);

      if (+userId <= 0) {
        return res.status(400).send({
          error: "Invalid id",
        });
      }

      if (userInfo.disabled) {
        return res.status(200).send({
          message:
            "This user is already disabled.",
        });
      }

      try {
        const disabledUser = await disableUser(userId);

        res.status(200).send({ disabledUser });
      } catch (error) {
        res
          .status(400)
          .send({ error: "Verify the requested user ID" });
      }
    }
  );

  UserRouter.post("/user/signin",
  isAuthenticated,
  isAuthorized({ roles: ["user"], allowSameUser: true }),
   async (req: Request, res: Response) => {
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
      if (decodedToken.role !== "user") {
        return res.status(401).send({
          error: "No Admin credential"
        });
      };
      res.status(200).send(decodedToken);

    } catch (error: AxiosError | any) {
      console.log(error);
      res.status(401).send({
        errorName: error?.name, message: "Bad Credentials"
      });
    }
  });

  UserRouter.post(
    "/admin",
    isAuthenticated,
    isAuthorized({ roles: ["superadmin"], allowSameUser: true }),
    async (req: Request, res: Response) => {
      const { displayName, email, password } = req.body;
  
      if (!displayName || !email || !password) {
        return res.status(400).send({ error: "Missing or incorrect fields" });
      }
  
      try {
        const newAdminId = await createUser(
          displayName,
          email,
          password,
          "admin"
        );
  
        res.status(201).send({
          success: "Admin created successfully!",
          id: newAdminId,
        });
      } catch (error) {
        res
          .status(500)
          .send({ error: "Something went wrong, admin not created." });
      }
    }
  );