import { Movie } from "../models/Movie";
import { MoviesRepository } from "../repositories/MoviesRepository";

interface CreateMovieDTO {
  title: string;
  year: string;
  genre: string;
  director: string;
  minutes: number;
  imdbScore: number;
  summary: string;
}

export class CreateMovieService {
  constructor(private moviesRepository: MoviesRepository) { }

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
}
