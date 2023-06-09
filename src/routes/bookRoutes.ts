import { Router } from "express";
import bookControllers from "../controllers/bookControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { bookSchemma } from "../schemas/book.js";

const bookRoutes : Router = Router();
bookRoutes.use(authMiddleware.authValidation);
bookRoutes.post(
  "/",
  
  validateSchema(bookSchemma),
  bookControllers.create
);
bookRoutes.get("/",  bookControllers.findAll);
bookRoutes.put(
  "/take-book/:id",
  
  bookControllers.takeBook
);
bookRoutes.get(
  "/my-books",
  
  bookControllers.findAllMyBooks
);
bookRoutes.delete("/book/:id", bookControllers.deleteBook);
export default bookRoutes;
