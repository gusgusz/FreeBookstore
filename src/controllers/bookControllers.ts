import bookServices from "../services/bookServices.js";
import {Request, Response, NextFunction} from "express";
import { createBook , Book} from "../protocols.js";

async function create(req: Request, res: Response, next: NextFunction) : Promise<Response>{
  const { name, author } : Omit<createBook,"userId"> = req.body;

  const { id } : { id: number } = res.locals.user;
  try {
    await bookServices.create({ name, author, userId: id });

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function deleteBook(req: Request, res: Response, next: NextFunction) : Promise<Response> {
  const id : number = req.params.id;

  try{
    await bookServices.delete(id);
    return res.sendStatus(200);
  }
  catch(err){
    next(err);
  }
}

async function findAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const books : Book[] = await bookServices.findAll();

    return res.send({ books });
  } catch (err) {
    next(err);
  }
}

async function takeBook(req: Request, res: Response, next: NextFunction) : Promise<Response>{
  const { id } : {id : number} = res.locals.user;
  const bookId : number = +req.params.id;
  try {
    await bookServices.takeBook(id, bookId);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function findAllMyBooks(req: Request, res: Response, next: NextFunction) : Promise<Response>{
  const { id }: {id : number}  = res.locals.user;
  try {
    const books : Book[] = await bookServices.findAllMyBooks(id);
    return res.send({ books });
  } catch (err) {
    next(err);
  }
}
export default { create, findAll, takeBook, findAllMyBooks };
