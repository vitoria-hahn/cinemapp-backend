import { GetAllProps } from "../utils/GetAllProps";
import { GetAllResponse } from "../utils/Response";
import { Movie } from "../models/Movie";

interface MoviesRepository {
  create(movie: Movie): Promise<void>;

  getById(id: string): Promise<Movie>;

  getAll(props: GetAllProps): Promise<GetAllResponse>;

  delete(id: string): Promise<void>;
}

export { MoviesRepository };
