import { MovieService } from "../services/MovieService";
import { Request, Response } from "express";

class GetMovieByIdController {
    constructor(private movieService: MovieService) { }
    async handle(request: Request, response: Response) {
        const result = await this.movieService.getById(request.params.id);

        return response.send(result);
    }
}

export { GetMovieByIdController };