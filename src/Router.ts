import { Router, request } from "express";
import { CreateMovieController } from "./api/controllers/CreateMovieController";
import { MoviesPostgresRepository } from "./api/repositories/MoviesPostgresRepository";
import { CreateMovieService } from "./api/services/CreateMovieService";
import { GetAllMoviesService } from "./api/services/GetAllMoviesService";
import { GetAllMoviesController } from "./api/controllers/GetAllMoviesController";
import { DeleteMovieService } from "./api/services/DeleteMovieService";
import { DeleteMovieController } from "./api/controllers/DeleteMovieController";

const moviesRepository = new MoviesPostgresRepository();

const createMovieService = new CreateMovieService(moviesRepository);
const createMovieController = new CreateMovieController(createMovieService);

const getAllMoviesService = new GetAllMoviesService(moviesRepository);
const getAllMoviesController = new GetAllMoviesController(getAllMoviesService);

const deleteMovieService = new DeleteMovieService(moviesRepository);
const deleteMovieController = new DeleteMovieController(deleteMovieService);

const router = Router();

router.post("/movies", (request, response) => {
  return createMovieController.handle(request, response);
});

router.get("/movies", (_request, response) => {
  return getAllMoviesController.handle(response);
});

router.delete("/movies/:id", (request, response) => {
  return deleteMovieController.handle(request, response);
})

export { router };
