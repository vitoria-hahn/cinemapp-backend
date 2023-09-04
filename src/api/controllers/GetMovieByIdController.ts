import { MovieService } from "../services/MovieService";
import { Request, Response } from "express";
import { returnResponse } from "../utils/StatusCodeValidation";

class GetMovieByIdController {
  constructor(private movieService: MovieService) {}
  async handle(request: Request, response: Response) {
    const result = await this.movieService.getById(request.params.id);

    returnResponse(result, response);
  }
}

export { GetMovieByIdController };
