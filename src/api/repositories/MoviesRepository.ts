import { Movie } from "../models/Movie";
import { GetAllResponse } from "./MoviesPostgresRepository";

interface MoviesRepository {
  create(movie: Movie): Promise<void>;

  getById(id: string): Promise<Movie>;

  getAll(startIndex: number, endIndex: number): Promise<GetAllResponse>;

  delete(id: string): Promise<number>;
}

export { MoviesRepository };
