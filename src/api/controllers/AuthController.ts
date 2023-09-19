import { Response, Request } from "express";
import { UserService } from "../services/UserService";
import { returnResponse } from "../utils/Response";
import { StatusCodes } from "http-status-codes";

class AuthController {
  constructor(private userService: UserService) {}

  async logInHandle(request: Request, response: Response) {
    const { username, password } = request.body;

    try {
      if (!username || !password) {
        return response
          .status(400)
          .json({ message: "Username and password are required" });
      } else {
        const result = await this.userService.login(request.body);

        return returnResponse(result, response);
      }
    } catch (error) {
      return response.status(StatusCodes.UNAUTHORIZED).json({ message: error });
    }
  }

  async signUpHandle(request: Request, response: Response) {
    const { username, password } = request.body;

    const result = await this.userService.signUp({
      username,
      password,
    });

    return returnResponse(result, response);
  }
}

export { AuthController };
