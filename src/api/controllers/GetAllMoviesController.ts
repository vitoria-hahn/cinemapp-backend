import { MovieService } from "../services/MovieService";
import { Response, Request } from "express";
import { CustomResponse } from "../utils/Response";
import { StatusCodes } from "http-status-codes";
import { getAllPropsObjectFromRequest } from "../utils/GetAllProps";

class GetAllMoviesController {
    constructor(private movieService: MovieService) { }
    async handle(request: Request, response: Response): Promise<void> {
        const requestWithProps = getAllPropsObjectFromRequest(request);

        const validcolumns = ["imdbScore", "genre", "director", "minutes", "title"];

        const validFilters = requestWithProps.filter?.every((filter) => {
            return validcolumns.includes(filter.field);
        })

        if (validFilters) {
            const result: CustomResponse = await this.movieService.getAll(requestWithProps);

            if (result.statusCode == StatusCodes.OK) {
                response.json(result.return)
            } else {
                response.status(result.statusCode).send(result.message)
            }
        } else {
            response.status(StatusCodes.BAD_REQUEST).send("movies can only be filtered by imdbScore, genre, director, minutes and title");
        }
    }
}

export { GetAllMoviesController };