import { Router } from "express";
import { CreateMovieController } from "./api/controllers/CreateMovieController";
import { MoviesPostgresRepository } from "./api/repositories/MoviesPostgresRepository";
import { CreateMovieService } from "./api/services/CreateMovieService";
import { GetAllMoviesService } from "./api/services/GetAllMoviesService";
import { GetAllMoviesController } from "./api/controllers/GetAllMoviesController";

const moviesRepository = new MoviesPostgresRepository();

const createMovieService = new CreateMovieService(moviesRepository);
const createMovieController = new CreateMovieController(createMovieService);

const getAllMoviesService = new GetAllMoviesService(moviesRepository);
const getAllMoviesController = new GetAllMoviesController(getAllMoviesService);

const router = Router();

router.post("/movies", (request, response) => {
  return createMovieController.handle(request, response);
});

router.get("/movies", (_request, response) => {
  return getAllMoviesController.handle(response);
});

export { router };
