import { Movie } from "../models/Movie";
import { MoviesRepository } from "./MoviesRepository";

import { connection } from "../database/connection";
import { Client, Connection } from "pg";

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

  async getById(id: string): Promise<Movie> {
    const response = await this.client.query(
      "SELECT * FROM MOVIES WHERE MOVIES.id = $1;", [id]
    );

    console.log(response);
    return response.rows[0];
  }

  async getAll(startIndex: number, endIndex: number): Promise<Movie[]> {
    const response = await this.client.query("SELECT * FROM MOVIES LIMIT $1 OFFSET $2", [endIndex, startIndex]);

    return response.rows;
  }

  async delete(id: Movie["id"]): Promise<void> {
    await this.client.query(
      "DELETE FROM MOVIES WHERE MOVIES.id = $1;", [id]
    );
  }
}

export { MoviesPostgresRepository };
