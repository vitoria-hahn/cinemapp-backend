import { StatusCodes } from "http-status-codes";
import { CustomResponse, GetAllResponse } from "../utils/Response";
import { Movie } from "../models/Movie";
import { MoviesRepository } from "../repositories/MoviesRepository";
import { GetAllProps } from "../filters/PaginationFilter";

interface CreateMovieDTO {
  title: string;
  year: number;
  genre: string[];
  director: string;
  minutes: number;
  imdbScore: number;
  summary: string;
}

export class MovieService {
  constructor(private moviesRepository: MoviesRepository) {}

  async getAll(requestWithProps: GetAllProps): Promise<CustomResponse> {
    try {
      const paginatedMovies: GetAllResponse =
        await this.moviesRepository.getAll(requestWithProps);

      const paginatedMovieResponse = {
        limit: requestWithProps.limit,
        page: requestWithProps.offset,
        movies: paginatedMovies,
      };

      return {
        statusCode: StatusCodes.OK,
        message: "movies fetched.",
        return: paginatedMovieResponse,
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `error fetching movies: ${error}`,
        return: null,
      };
    }
  }

  async getById(id: string): Promise<CustomResponse> {
    try {
      const response = await this.moviesRepository.getById(id);

      return {
        statusCode: StatusCodes.OK,
        message: `movie fetched with success`,
        return: response,
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `error fetching movie: ${error}`,
        return: null,
      };
    }
  }

  async create({
    title,
    year,
    genre,
    director,
    minutes,
    imdbScore,
    summary,
  }: CreateMovieDTO): Promise<CustomResponse> {
    try {
      let movie = new Movie();

      if (
        year < 2100 &&
        year > 0 &&
        minutes > 0 &&
        minutes < 1000 &&
        imdbScore <= 10 &&
        imdbScore >= 0
      ) {
        movie = Object.assign({
          ...movie,
          title,
          year,
          genre,
          director,
          minutes,
          imdbScore,
          summary,
        });

        const response = await this.moviesRepository.create(movie);

        return {
          statusCode: StatusCodes.OK,
          message: `movie created with success`,
          return: response,
        };
      } else {
        return {
          statusCode: StatusCodes.NOT_ACCEPTABLE,
          message: "request body not accepted, syntax error",
          return: null,
        };
      }
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `error fetching movies: ${error}`,
        return: null,
      };
    }
  }

  async delete(id: string): Promise<CustomResponse> {
    try {
      const response = await this.moviesRepository.delete(id);

      return {
        statusCode: StatusCodes.OK,
        message: `movie deleted with success: ${id}`,
        return: response,
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `error deleting movies: ${error}`,
        return: null,
      };
    }
  }
}
