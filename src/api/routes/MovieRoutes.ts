import { Router, Request, Response } from "express";
import { MovieController } from "../controllers/MovieController";
import { MoviesPostgresRepository } from "../repositories/MoviesPostgresRepository";
import { MovieService } from "../services/MovieService";

const moviesRepository = new MoviesPostgresRepository();
const movieService = new MovieService(moviesRepository);
const movieController = new MovieController(movieService);

const movieRouter = Router();

movieRouter.post("", (request: Request, response: Response) => {
  return movieController.createMovieHandle(request, response);
});

movieRouter.get("", (request: Request, response: Response) => {
  return movieController.getAllMoviesHandle(request, response);
});

movieRouter.get("/:id", (request, response) => {
  return movieController.getMovieByIdHandle(request, response);
});

movieRouter.delete("/:id", (request, response) => {
  return movieController.deleteMovieHandle(request, response);
});

export { movieRouter };
