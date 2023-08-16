import { Movie } from "../models/Movie";
import { MoviesRepository } from "./MoviesRepository";

import { connection } from "../database/connection";
import { Client } from "pg";

class MoviesPostgresRepository implements MoviesRepository {
  private client: Client;

  constructor() {
    this.client = connection;
  }

  async create(movie: Movie): Promise<void> {
    await this.client.query(
      "INSERT INTO MOVIES(ID, TITLE, YEAR, GENRE, DIRECTOR, MINUTES, IMDBSCORE, SUMMARY) \
        VALUES($1, $2, $3, $4, $5, $6, $7, $8);",
      [
        movie.id,
        movie.title,
        movie.year,
        movie.genre,
        movie.director,
        movie.minutes,
        movie.imdbScore,
        movie.summary,
      ],
    );
  }

  async getAll(): Promise<Movie[]> {
    const response = await this.client.query(
      "SELECT * FROM MOVIES;"
    );

    return response.rows;
  }

  async getById(id: string): Promise<Movie> {
    const response = await this.client.query(
      "SELECT * FROM MOVIES WHERE MOVIES.id = $1;", [id]
    );

    console.log(response);
    return response.rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.client.query(
      "DELETE FROM MOVIES WHERE MOVIES.id = $1;", [id]
    );
  }
}

export { MoviesPostgresRepository };
