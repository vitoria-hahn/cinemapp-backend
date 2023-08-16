import { Movie } from "../models/Movie";

interface MoviesRepository {
  create(movie: Movie): Promise<void>;
}

export { MoviesRepository };
