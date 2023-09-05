import { MovieService } from "../services/MovieService";
import { Request, Response } from "express";
import { returnResponse } from "../utils/Response";

class DeleteMovieController {
  constructor(private movieService: MovieService) {}
  async handle(request: Request, response: Response) {
    const result = await this.movieService.delete(request.params.id);

    returnResponse(result, response);
  }
}

export { DeleteMovieController };
