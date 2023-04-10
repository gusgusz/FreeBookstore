import connectionDb from "../config/database.js";
import { createBook, Book } from "../protocols.js";
import { QueryResult } from "pg";

async function create({ name, author, userId } : createBook) : Promise<void>{
    await connectionDb.query<QueryResult>(
      `
          INSERT INTO books (name, author, "userId")
          VALUES ($1, $2, $3)
          `,
      [name, author, userId]
    );
  }
  
  async function findByName(name : string) : Promise<QueryResult> {
    return await connectionDb.query<QueryResult<Book[]>>(
      `
          SELECT * FROM books WHERE name = $1;
      `,
      [name]
    );
  }
  
  async function findAll() : Promise<QueryResult>{
    return await connectionDb.query<QueryResult<Book[]>>(
      `
          SELECT 
            b.id, b.name, b.author, b.available, 
            u.name as "createdBy"
          FROM books b
          JOIN users u
          ON b."userId" = u.id;
      `
    );
  }
  
  async function findById(id : number) : Promise<QueryResult>{
    return await connectionDb.query<QueryResult<Book[]>>(
      `
            SELECT * FROM books 
            WHERE id = $1;
        `,
      [id]
    );
  }

  async function deleteBook(id : number) {
    return await connectionDb.query(
      `
            DELETE  books 
            WHERE id = $1;
        `,
      [id]
    );
  }
  
  
  async function updateStatusBook(status: boolean, bookId : number) : Promise<void> {
    await connectionDb.query<QueryResult>(
      `
        UPDATE books
        SET available = $1
        WHERE id = $2;
    `,
      [status, bookId]
    );
  }
  
  async function takeBook(userId: number, bookId: number) : Promise<void>{
    await connectionDb.query<QueryResult>(
      `
        INSERT INTO "myBooks" ("userId", "bookId")
        VALUES ($1, $2);
      `,
      [userId, bookId]
    );
  }
  
  async function findAllMyBooks(userId : number) : Promise<QueryResult> {
    return await connectionDb.query<QueryResult>(
      `
      SELECT 
        u.name as "user_name",
        b.name as "book_name",
        b.author as "book_author" 
      FROM "myBooks" m
        JOIN users u ON m."userId" = u.id
        JOIN books b ON m."bookId" = b.id
      WHERE m."userId" = $1
      `,
      [userId]
    );
  }
  
  export default {
    create,
    findByName,
    findAll,
    findById,
    takeBook,
    updateStatusBook,
    findAllMyBooks,
  };
  