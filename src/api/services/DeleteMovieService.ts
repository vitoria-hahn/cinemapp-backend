import { Movie } from "../models/Movie";
import { MoviesRepository } from "../repositories/MoviesRepository";

export class DeleteMovieService {
    constructor(private moviesRepository: MoviesRepository) { }

    async delete(id: string): Promise<void> {
        await this.moviesRepository.delete(id);
    }
}