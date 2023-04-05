import errors from "../errors/index.js";
import userRepositories from "../repositories/userRepositories.js";
import {Request, Response , NextFunction,} from "express";
import { Session, UserDb } from "../protocols.js";

async function authValidation(req: Request, res: Response, next: NextFunction) : Promise<void>{
  const { authorization } = req.headers;
  const token : string | undefined = authorization?.replace("Bearer ", "");

  if (!token) throw errors.unauthorizedError();

  try {
    const {
      rows: [session],
    } : {rows : Session[]} = await userRepositories.findSessionByToken(token);
    if (!session) throw errors.unauthorizedError();

    const {
      rows: [user],
    } : {rows: UserDb[]} = await userRepositories.findById(session.userId);
    if (!user) throw errors.notFoundError();

    res.locals.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export default { authValidation };
