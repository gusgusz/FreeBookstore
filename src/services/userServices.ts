import bcrypt from "bcrypt";
import userRepositories from "../repositories/userRepositories.js";
import { v4 as uuidV4 } from "uuid";
import errors from "../errors/index.js";
import { User, UserSignIn, UserDb } from "../protocols.js";


async function create({ name, email, password } : User) : Promise<void> {
  const { rowCount } : {rowCount: number} = await userRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword : string = await bcrypt.hash(password, 10);
  await userRepositories.create({ name, email, password: hashPassword });
}

async function signin({ email, password } : UserSignIn) {
  const {
    rowCount,
    rows: [user],
  } : {rowCount: number, rows: UserDb[]} = await userRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword : boolean = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token : string = uuidV4();
  await userRepositories.createSession({ token, userId: user.id });

  return token;
}

export default {
  create,
  signin,
};
