import { Client } from "pg";
import { connection } from "../database/connection";
import { UserRepository } from "./UserRepository";
import { User } from "../models/User";

class UserPostgresqlRepository implements UserRepository {
  private client: Client;

  constructor() {
    this.client = connection;
  }

  async signup(user: User): Promise<void> {
    try {
      await this.client.query(
        "INSERT INTO USERS(ID, USERNAME, PASSWORD) \
          VALUES($1, $2, $3);",
        [user.id, user.username, user.password],
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getById(username: string): Promise<User> {
    try {
      const response = await this.client.query(
        "SELECT * FROM USERS WHERE USERS.username = $1;",
        [username],
      );
      if (!response.rows[0]) {
        throw new Error(`no user with username: ${username} exists`);
      } else {
        return response.rows[0];
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export { UserPostgresqlRepository };
