import { StatusCodes } from "http-status-codes";
import { Movie } from "../models/Movie";

export interface GetAllResponse {
  data: Movie[];
  count: number;
}

export interface PaginatedMoviesResponse {
  limit: number;
  page: number;
  movies: GetAllResponse;
}

export interface CustomResponse {
  statusCode: StatusCodes;
  message: string;
  return: any;
}
