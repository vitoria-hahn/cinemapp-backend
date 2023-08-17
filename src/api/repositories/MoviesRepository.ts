import { Movie } from "../models/Movie";

interface MoviesRepository {
  create(movie: Movie): Promise<void>;

  getById(id: string): Promise<Movie>;

  getAll(startIndex: number, endIndex: number): Promise<Movie[]>;

  delete(id: string): Promise<void>;
}

export { MoviesRepository };
