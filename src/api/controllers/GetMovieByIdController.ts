import { MovieService } from "../services/MovieService";
import { Request, Response } from "express";
import { returnResponse } from "../utils/Response";

class GetMovieByIdController {
  constructor(private movieService: MovieService) {}
  async handle(request: Request, response: Response) {
    const result = await this.movieService.getById(request.params.id);

    return returnResponse(result, response);
  }
}

export { GetMovieByIdController };
