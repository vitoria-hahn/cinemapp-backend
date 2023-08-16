import { Router } from "express";
import { CreateMovieController } from "../api/controllers/CreateMovieController";
import { MoviesPostgresRepository } from "../api/repositories/MoviesPostgresRepository";
import { CreateMovieService } from "../api/services/CreateMovieService";

const moviesRepository = new MoviesPostgresRepository();

const createMovieService = new CreateMovieService(moviesRepository);
const createMovieController = new CreateMovieController(createMovieService);

const router = Router();

router.post("/movies", (request, response) => {
  return createMovieController.handle(request, response);
});

export { router };
