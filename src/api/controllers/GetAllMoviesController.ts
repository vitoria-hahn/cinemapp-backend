import { MovieService } from "../services/MovieService";
import { Response, Request } from "express";
import { CustomResponse, returnResponse } from "../utils/Response";
import { StatusCodes } from "http-status-codes";
import {
  GetAllProps,
  getAllPropsObjectFromRequest,
} from "../filters/PaginationFilter";

class GetAllMoviesController {
  constructor(private movieService: MovieService) {}

  async handle(request: Request, response: Response) {
    const requestWithProps: GetAllProps = getAllPropsObjectFromRequest(request);

    const validcolumns = [
      "imdbScore",
      "genre",
      "director",
      "minutes",
      "title",
      "summary",
    ];

    let validFilters;

    if (requestWithProps.filter) {
      validFilters = (
        Array.isArray(requestWithProps.filter)
          ? requestWithProps.filter
          : [requestWithProps.filter]
      ).every((filter) => {
        return validcolumns.includes(filter?.field);
      });
    } else {
      validFilters = true;
    }

    if (validFilters) {
      const result: CustomResponse = await this.movieService.getAll(
        requestWithProps,
      );
      return returnResponse(result, response);
    } else {
      const result = {
        statusCode: StatusCodes.BAD_REQUEST,
        message:
          "movies can only be filtered by imdbScore, genre, director, minutes and title",
        return: null,
      };
      response.status(StatusCodes.BAD_REQUEST).json({ error: result });
    }
  }
}

export { GetAllMoviesController };
