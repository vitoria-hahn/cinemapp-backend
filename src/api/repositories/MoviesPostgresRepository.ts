import { Movie } from "../models/Movie";
import { MoviesRepository } from "./MoviesRepository";

import { connection } from "../database/connection";
import { Client } from "pg";

export interface GetAllResponse {
  data: Movie[];
  count: number;
}

class MoviesPostgresRepository implements MoviesRepository {
  private client: Client;

  constructor() {
    this.client = connection;
  }

  async create(movie: Movie): Promise<void> {
    const response = await this.client.query(
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

    return response.rows[0];
  }

  async getAll(startIndex: number, endIndex: number, column?: string, value?: string): Promise<GetAllResponse> {
    let responseSelect;
    let responseCount;

    if (column && value) {
      responseSelect = this.client.query("SELECT * FROM MOVIES WHERE $1 = ANY(MOVIES." + column + ") LIMIT $2 OFFSET $3;", [value, endIndex, startIndex]);
      responseCount = this.client.query("SELECT COUNT(*) FROM MOVIES WHERE $1 = ANY(MOVIES." + column + ");", [value]);
    } else {
      responseSelect = this.client.query("SELECT * FROM MOVIES LIMIT $1 OFFSET $2;", [endIndex, startIndex]);
      responseCount = this.client.query("SELECT COUNT(*) FROM MOVIES;");
    }

    const promises = [responseSelect, responseCount];

    const response = await Promise.all(promises);

    return {
      data: response[0].rows,
      count: response[1].rows[0].count,
    }
  }

  async delete(id: Movie["id"]): Promise<number> {

    if (await this.getById(id)) {
      await this.client.query(
        "DELETE FROM MOVIES WHERE MOVIES.id = $1;", [id]
      );
      return 200;
    } else {
      return 404;
    }
  }
}

export { MoviesPostgresRepository };
