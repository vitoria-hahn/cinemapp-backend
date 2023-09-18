import express, { Router, Request, Response } from "express";
import { CreateMovieController } from "./api/controllers/CreateMovieController";
import { MoviesPostgresRepository } from "./api/repositories/MoviesPostgresRepository";
import { GetAllMoviesController } from "./api/controllers/GetAllMoviesController";
import { DeleteMovieController } from "./api/controllers/DeleteMovieController";
import { MovieService } from "./api/services/MovieService";
import { GetMovieByIdController } from "./api/controllers/GetMovieByIdController";
import { UserPostgresqlRepository } from "./api/repositories/UserPostgresRepository";
import { UserService } from "./api/services/UserService";
import { SignUpController } from "./api/controllers/SignUpController";
import { LogInController } from "./api/controllers/LogInController";
import { authenticateJWT } from "./api/authentication/AuthenticateJWT";

const userRepository = new UserPostgresqlRepository();
const userService = new UserService(userRepository);

const moviesRepository = new MoviesPostgresRepository();
const movieService = new MovieService(moviesRepository);

const loginController = new LogInController(userService);

const signUpController = new SignUpController(userService);

const createMovieController = new CreateMovieController(movieService);

const getAllMoviesController = new GetAllMoviesController(movieService);

const deleteMovieController = new DeleteMovieController(movieService);

const getMoMovieByIdController = new GetMovieByIdController(movieService);

const router = Router();
router.use("/movies", authenticateJWT);

router.use(express.json());

router.post("/signup", (request: Request, response: Response) => {
  return signUpController.handle(request, response);
});

router.get("/login", (request: Request, response: Response) => {
  return loginController.handle(request, response);
});

router.post("/movies", (request: Request, response: Response) => {
  return createMovieController.handle(request, response);
});

router.get("/movies", (request: Request, response: Response) => {
  return getAllMoviesController.handle(request, response);
});

router.get("/movies/:id", (request, response) => {
  return getMoMovieByIdController.handle(request, response);
});

router.get("/movies/:id", (request, response) => {
  return getMoMovieByIdController.handle(request, response);
});

router.delete("/movies/:id", (request, response) => {
  return deleteMovieController.handle(request, response);
});

export { router };
