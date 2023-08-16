import { Movie } from "../models/Movie";
import { MoviesRepository } from "../repositories/MoviesRepository";

export class GetAllMoviesService {
    constructor(private moviesRepository: MoviesRepository) { }

    async getAll(): Promise<Movie[]> {
        const response = await this.moviesRepository.getAll();

        return response;
    }
}