import { Request, Response } from "express";
import { MovieService } from "../services/MovieService";
import { StatusCodes } from "http-status-codes";

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

    if (result.statusCode == StatusCodes.OK) {
      response.json(result.message)
    } else {
      response.status(result.statusCode).send(result.message)
    }
  }
}

export { CreateMovieController };