import { Movie } from "../models/Movie";

interface MoviesRepository {
  create(movie: Movie): Promise<void>;

  getAll(): Promise<Movie[]>;

  delete(id: string): Promise<void>;
}

export { MoviesRepository };
