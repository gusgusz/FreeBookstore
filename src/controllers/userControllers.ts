import userServices from "../services/userServices.js";
import {Request, Response, NextFunction} from "express";
import { User , UserSignIn} from "../protocols.js"


async function create(req: Request, res: Response, next: NextFunction) : Promise<Response | NextFunction> {
  const { name, email, password }: User = req.body;
  try {
    await userServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signin(req: Request, res: Response, next: NextFunction) {
  const { email, password } : UserSignIn = req.body;
  try {
    const token : string = await userServices.signin({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  signin,
};
