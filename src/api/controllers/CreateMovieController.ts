import { Request, Response } from "express";
import { MovieService } from "../services/MovieService";

class CreateMovieController {
  constructor(private movieService: MovieService) { }
  async handle(request: Request, response: Response) {
    const { title, year, genre, director, minutes, imdbScore, summary } =
      request.body;

    const result = await this.movieService.create({
      title,
      year,
      genre,
      director,
      minutes,
      imdbScore,
      summary,
    });

    return response.sendStatus(result);
  }
}

export { CreateMovieController };