import { Movie } from "../models/Movie";
import { GetAllResponse } from "./MoviesPostgresRepository";

interface MoviesRepository {
  create(movie: Movie): Promise<void>;

  getById(id: string): Promise<Movie>;

  getAll(startIndex: number, endIndex: number, column?: string, value?: string): Promise<GetAllResponse>;

  delete(id: string): Promise<number>;
}

export { MoviesRepository };
