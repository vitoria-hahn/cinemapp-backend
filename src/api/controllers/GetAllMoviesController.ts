import { MovieService, PaginatedMoviesResponse } from "../services/MovieService";
import { Response, Request } from "express";

class GetAllMoviesController {
    constructor(private movieService: MovieService) { }
    async handle(request: Request, response: Response): Promise<void> {
        const paginatedMovies: PaginatedMoviesResponse = await this.movieService.getAll(request);

        response.json(paginatedMovies);
    }
}

export { GetAllMoviesController };