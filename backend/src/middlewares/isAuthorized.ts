import { Request, Response } from "express";

type authorizationOptions = {
  allowSameUser: boolean;
};

// A middleware that will check if a user is authorized according to its role
export const isAuthorized = (options: authorizationOptions) => {
  return (req: Request, res: Response, next: Function) => {
    const { uid, email } = res.locals;
    const { userId } = req.params;

    if (email === process.env.SUPER_USER) {
      return next();
    }

    if (options.allowSameUser && userId && userId === uid) {
      return next();
    } else {
      return res.status(403).send("No Auth");
    }
  };
};
