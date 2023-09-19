import { Request, Response } from "express";
import { MovieService } from "../services/MovieService";
import { CustomResponse, returnResponse } from "../utils/Response";
import { StatusCodes } from "http-status-codes";
import {
  GetAllProps,
  getAllPropsObjectFromRequest,
} from "../filters/PaginationFilter";

class MovieController {
  constructor(private movieService: MovieService) {}
  async createMovieHandle(request: Request, response: Response) {
    const { title, year, genre, director, minutes, imdbScore, summary } =
      request.body;

    const result = await this.movieService.create({
      title,
      year,
      genre,
      director,
      minutes,
      imdbScore,
      summary,
    });

    return returnResponse(result, response);
  }

  async deleteMovieHandle(request: Request, response: Response) {
    const result = await this.movieService.delete(request.params.id);

    return returnResponse(result, response);
  }

  async getMovieByIdHandle(request: Request, response: Response) {
    const result = await this.movieService.getById(request.params.id);

    return returnResponse(result, response);
  }

  async getAllMoviesHandle(request: Request, response: Response) {
    const requestWithProps: GetAllProps = getAllPropsObjectFromRequest(request);

    const validcolumns = [
      "imdbScore",
      "genre",
      "director",
      "minutes",
      "title",
      "summary",
    ];

    let areFiltersValid;

    if (requestWithProps.filter) {
      const { filter } = requestWithProps;

      const filterArray = Array.isArray(filter) ? filter : [filter];

      areFiltersValid = filterArray.every((filter) => {
        return validcolumns.includes(filter?.field);
      });
    } else {
      areFiltersValid = true;
    }

    if (areFiltersValid) {
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

export { MovieController };
