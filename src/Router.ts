import { Router, Request, Response } from "express";
import { CreateMovieController } from "./api/controllers/CreateMovieController";
import { MoviesPostgresRepository } from "./api/repositories/MoviesPostgresRepository";
import { GetAllMoviesController } from "./api/controllers/GetAllMoviesController";
import { DeleteMovieController } from "./api/controllers/DeleteMovieController";
import { MovieService } from "./api/services/MovieService";
import { GetMovieByIdController } from "./api/controllers/GetMovieByIdController";

const moviesRepository = new MoviesPostgresRepository();
const movieService = new MovieService(moviesRepository);

const createMovieController = new CreateMovieController(movieService);

const getAllMoviesController = new GetAllMoviesController(movieService);

const deleteMovieController = new DeleteMovieController(movieService);

const getMoMovieByIdController = new GetMovieByIdController(movieService);

const router = Router();

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
