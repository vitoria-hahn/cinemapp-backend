import { PaginationResponse, pagination } from "../controllers/utils/Pagination";
import { Movie } from "../models/Movie";
import { GetAllResponse } from "../repositories/MoviesPostgresRepository";
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
    movies: GetAllResponse;
}

export class MovieService {
    constructor(private moviesRepository: MoviesRepository) { }

    async getAll(request: Request): Promise<PaginatedMoviesResponse> {
        const paginationResult: PaginationResponse = pagination(request);

        const paginatedMovies: GetAllResponse = await this.moviesRepository.getAll(paginationResult.startIndex, paginationResult.endIndex);

        const paginatedMovieResponse = {
            page: parseInt(request.query.page as string),
            limit: parseInt(request.query.limit as string),
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

    async delete(id: string): Promise<number> {
        const response = await this.moviesRepository.delete(id);

        if (response == 200) {
            return response;
        }

        return response;
    }
}