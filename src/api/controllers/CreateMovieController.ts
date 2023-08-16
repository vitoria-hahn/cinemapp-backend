import { Request, Response } from "express";
import { CreateMovieService } from "../services/CreateMovieService";

class CreateMovieController {
  constructor(private createMovieService: CreateMovieService) { }
  async handle(request: Request, response: Response) {
    const { title, year, genre, director, minutes, imdbScore, summary } =
      request.body;

    await this.createMovieService.create({
      title,
      year,
      genre,
      director,
      minutes,
      imdbScore,
      summary,
    });

    return response.send();
  }
}

export { CreateMovieController };