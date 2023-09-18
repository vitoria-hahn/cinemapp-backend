import { UserService } from "../services/UserService";
import { returnResponse } from "../utils/Response";
import { Request, Response } from "express";

class SignUpController {
  constructor(private userService: UserService) {}
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const result = await this.userService.signUp({
      username,
      password,
    });

    return returnResponse(result, response);
  }
}

export { SignUpController };
