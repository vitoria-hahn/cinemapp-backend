import { Movie } from "../models/Movie";
import { MoviesRepository } from "../repositories/MoviesRepository";

export class GetMovieByIdService {
    constructor(private moviesRepository: MoviesRepository) { }

    async getById(id: string): Promise<Movie> {
        const response = await this.moviesRepository.getById(id);

        return response;
    }
}
