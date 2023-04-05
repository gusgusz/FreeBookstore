import pg, {Pool} from "pg";
import dotenv from "dotenv";
dotenv.config();



const connectionDb : Pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export default connectionDb;
