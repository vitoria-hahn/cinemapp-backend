import { GetAllProps } from "../controllers/utils/GetAllProps";
import { PaginationResponse } from "../controllers/utils/Pagination";
import { Movie } from "../models/Movie";
import { GetAllResponse } from "./MoviesPostgresRepository";

interface MoviesRepository {
  create(movie: Movie): Promise<void>;

  getById(id: string): Promise<Movie>;

  getAll(props: GetAllProps): Promise<GetAllResponse>;

  delete(id: string): Promise<number>;
}

export { MoviesRepository };
