import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import { CustomResponse } from "../utils/Response";
import { generateJWT } from "../authentication/GenerateJWT";
import { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface SignUpDTO {
  username: string;
  password: string;
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async signUp({ username, password }: SignUpDTO): Promise<CustomResponse> {
    try {
      let user = new User();

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      user = Object.assign({
        ...user,
        username,
        password: hash,
      });

      const response = await this.userRepository.signup(user);

      return {
        statusCode: StatusCodes.OK,
        message: `signup with success`,
        return: response,
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `error signing up: ${error}`,
        return: null,
      };
    }
  }

  async login(user: User): Promise<CustomResponse> {
    try {
      if (!user.username || !user.password) {
        return {
          statusCode: StatusCodes.BAD_REQUEST,
          message: `error logging in: user does not exist`,
          return: null,
        };
      } else {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
          return {
            statusCode: StatusCodes.BAD_REQUEST,
            message: `secret key not provided`,
            return: null,
          };
        }

        const getUser = await this.userRepository.getById(user.username);

        if (user && (await bcrypt.compare(user.password, getUser.password))) {
          const payload = {
            user: user.username,
          };

          const signOptions: SignOptions = {
            algorithm: "HS256",
            expiresIn: "120s",
          };

          const token = generateJWT(payload, signOptions, secretKey);
          return {
            statusCode: StatusCodes.OK,
            message: `user logged in`,
            return: {
              token: token,
              user: user.username,
            },
          };
        } else {
          return {
            statusCode: StatusCodes.UNAUTHORIZED,
            message: `incorrect password`,
            return: null,
          };
        }
      }
    } catch (error) {
      return {
        statusCode: StatusCodes.FORBIDDEN,
        message: `error signing up: ${error}`,
        return: null,
      };
    }
  }
}
