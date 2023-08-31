import { StatusCodes } from "http-status-codes";
import { MovieService } from "../services/MovieService";
import { Request, Response } from "express";

class GetMovieByIdController {
    constructor(private movieService: MovieService) { }
    async handle(request: Request, response: Response) {
        const result = await this.movieService.getById(request.params.id);

        if (result.statusCode == StatusCodes.OK) {
            response.json(result.return)
        } else {
            response.status(result.statusCode).send(result.message)
        }
    }
}

export { GetMovieByIdController };