import err from "../errors/index.js";
import { Request, Response, NextFunction ,  RequestHandler} from "express";
import Joi from "joi";

export function validateSchema(schema: Joi.ObjectSchema<any>) : RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = (error.details.map((detail) => detail.message)).join(" && ");
      throw err.conflictError(errors);
    }

    next();
  };
}
