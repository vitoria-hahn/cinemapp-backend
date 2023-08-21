import { PaginationResponse, pagination } from "../controllers/utils/Pagination";
import { Movie } from "../models/Movie";
import { GetAllResponse } from "../repositories/MoviesPostgresRepository";
import { MoviesRepository } from "../repositories/MoviesRepository";
import { Request } from "express";


interface CreateMovieDTO {
    title: string;
    year: number;
    genre: string[];
    director: string;
    minutes: number;
    imdbScore: number;
    summary: string;
}

export interface PaginatedMoviesResponse {
    page: number;
    limit: number;
    movies: GetAllResponse;
}

export class MovieService {
    constructor(private moviesRepository: MoviesRepository) { }

    async getAll(request: Request): Promise<PaginatedMoviesResponse> {
        const paginationResult: PaginationResponse = pagination(request);

        const paginatedMovies: GetAllResponse = await this.moviesRepository.getAll(paginationResult.startIndex, paginationResult.endIndex);

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
    }: CreateMovieDTO): Promise<number> {
        let movie = new Movie();

        if (year < 2100 && year > 0 && minutes > 0 && minutes < 1000 && imdbScore <= 10 && imdbScore >= 0) {
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

            return 200;
        } else {
            return 500;
        }
    }

    async delete(id: string): Promise<number> {
        const response = await this.moviesRepository.delete(id);

        if (response == 200) {
            return response;
        }

        return response;
    }
}