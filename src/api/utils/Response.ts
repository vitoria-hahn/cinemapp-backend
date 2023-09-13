import { StatusCodes } from "http-status-codes";
import { Movie } from "../models/Movie";
import { Response } from "express";

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

export function returnResponse(result: CustomResponse, response: Response) {
  if (result.statusCode === StatusCodes.OK) {
    return response.json(result);
  } else {
    return response.status(result.statusCode).json({ error: result });
  }
}
