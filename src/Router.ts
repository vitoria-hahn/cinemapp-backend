import { Router, Request, Response } from "express";
import { authenticateJWT } from "./api/authentication/AuthenticateJWT";
import { movieRouter } from "./api/routes/MovieRoutes";
import { UserPostgresqlRepository } from "./api/repositories/UserPostgresRepository";
import { AuthController } from "./api/controllers/AuthController";
import { UserService } from "./api/services/UserService";

const userRepository = new UserPostgresqlRepository();
const userService = new UserService(userRepository);
const authcontroller = new AuthController(userService);

export const router = Router();

router.post("/signup", (request: Request, response: Response) => {
  return authcontroller.signUpHandle(request, response);
});

router.get("/login", (request: Request, response: Response) => {
  return authcontroller.logInHandle(request, response);
});

router.use("/movies", authenticateJWT, movieRouter);
