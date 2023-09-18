import { Response, Request } from "express";
import { UserService } from "../services/UserService";
import { returnResponse } from "../utils/Response";

class LogInController {
  constructor(private userService: UserService) {}

  async handle(request: Request, response: Response) {
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
      console.error("Error during login:", error);
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}

export { LogInController };
