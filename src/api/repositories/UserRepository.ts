import { User } from "../models/User";

interface UserRepository {
  signup(user: User): Promise<void>;
  getById(username: string): Promise<User>;
}

export { UserRepository };
