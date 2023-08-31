import { MovieService } from "../services/MovieService";
import { Response, Request } from "express";
import { CustomResponse } from "../utils/Response";
import { StatusCodes } from "http-status-codes";

class GetAllMoviesController {
    constructor(private movieService: MovieService) { }
    async handle(request: Request, response: Response): Promise<void> {
        const result: CustomResponse = await this.movieService.getAll(request);

        if (result.statusCode == StatusCodes.OK) {
            response.json(result.return)
        } else {
            response.status(result.statusCode).send(result.message)
        }
    }
}

export { GetAllMoviesController };