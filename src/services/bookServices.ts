import errors from "../errors/index.js";
import bookRepositories from "../repositories/bookRepositories.js";
import { Book, createBook } from "../protocols.js";

async function create({ name, author, userId } : createBook) : Promise<void> {
  const {
    rows: [book],
  } : { rows: Book[] } = await bookRepositories.findByName(name);
  if (book) throw errors.conflictError("Book already exists");

  await bookRepositories.create({ name, author, userId });
}

async function findAll() : Promise<Book[] | never>  {
  const { rows, rowCount } : { rows: Book[], rowCount: number} = await bookRepositories.findAll();
  if (!rowCount) throw errors.notFoundError();
  return rows;
}

async function takeBook(userId: number, bookId: number) : Promise<void> {
  const {
    rows: [book],
    rowCount,
  } : {rows: Book[], rowCount: number} = await bookRepositories.findById(bookId);
  if (!rowCount) throw errors.notFoundError();
  if (!book.available) throw errors.conflictError("Book not available");

  await bookRepositories.updateStatusBook(false, bookId);
  await bookRepositories.takeBook(userId, bookId);
}

async function findAllMyBooks(userId : number) : Promise<Book[] | never>{
  const { rows: books, rowCount } : {rows: Book[], rowCount:number}= await bookRepositories.findAllMyBooks(
    userId
  );
  if (!rowCount) throw errors.notFoundError();
  return books;
}

export default { create, findAll, takeBook, findAllMyBooks };
