import { MovieService } from "../services/MovieService";
import { Request, Response } from "express";

class DeleteMovieController {
    constructor(private movieService: MovieService) { }
    async handle(request: Request, response: Response) {
        const result = await this.movieService.delete(request.params.id);

        return response.send(result);
    }
}

export { DeleteMovieController };
