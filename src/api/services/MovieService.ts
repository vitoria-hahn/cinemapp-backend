import { PaginationResponse, pagination } from "../controllers/utils/Pagination";
import { Movie } from "../models/Movie";
import { MoviesRepository } from "../repositories/MoviesRepository";
import { Response, Request } from "express";


interface CreateMovieDTO {
    title: string;
    year: string;
    genre: string;
    director: string;
    minutes: number;
    imdbScore: number;
    summary: string;
}

export interface PaginatedMoviesResponse {
    page: number;
    limit: number;
    movies: Movie[];
}

export class MovieService {
    constructor(private moviesRepository: MoviesRepository) { }

    async getAll(request: Request): Promise<PaginatedMoviesResponse> {
        const paginationResult: PaginationResponse = pagination(request);

        const paginatedMovies: Movie[] = await this.moviesRepository.getAll(paginationResult.startIndex, paginationResult.endIndex);

        const paginatedMovieResponse = {
            page: paginationResult.page,
            limit: paginationResult.limit,
            movies: paginatedMovies,
        };

        return paginatedMovieResponse;
    }


    async getById(id: string): Promise<Movie> {
        const response: Movie = await this.moviesRepository.getById(id);

        return response;
    }

    async create({
        title,
        year,
        genre,
        director,
        minutes,
        imdbScore,
        summary,
    }: CreateMovieDTO) {
        let movie = new Movie();

        movie = Object.assign({
            ...movie,
            title,
            year,
            genre,
            director,
            minutes,
            imdbScore,
            summary,
        });

        await this.moviesRepository.create(movie);
    }

    async delete(id: string): Promise<void> {
        await this.moviesRepository.delete(id);
    }
}