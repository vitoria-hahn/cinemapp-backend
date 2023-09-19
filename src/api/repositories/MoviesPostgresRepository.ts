import { Movie } from "../models/Movie";
import { MoviesRepository } from "./MoviesRepository";

import { connection } from "../database/connection";
import { Client } from "pg";
import {
  buildSqlRawCountQuery,
  buildSqlRawSelectQuery,
} from "../database/BuildQuery";
import { GetAllResponse } from "../utils/Response";
import { GetAllProps } from "../filters/PaginationFilter";

class MoviesPostgresRepository implements MoviesRepository {
  private client: Client;

  constructor() {
    this.client = connection;
  }

  async create(movie: Movie): Promise<void> {
    try {
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
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getById(id: string): Promise<Movie> {
    try {
      const response = await this.client.query(
        "SELECT * FROM MOVIES WHERE MOVIES.id = $1;",
        [id],
      );
      if (!response.rows[0]) {
        throw new Error(`no movie with id: ${id} exists`);
      } else {
        return response.rows[0];
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getAll(props: GetAllProps): Promise<GetAllResponse> {
    try {
      const { limit, offset, filter } = props;
      const alias = "movie";

      const tableName = "movies";
      const rawSelectQuery = buildSqlRawSelectQuery(
        tableName,
        alias,
        limit,
        offset,
        filter,
      );
      const rawCountQuery = buildSqlRawCountQuery(tableName, alias, filter);

      const responseSelect = this.client.query(rawSelectQuery);
      const responseCount = this.client.query(rawCountQuery);

      const promises = [responseSelect, responseCount];

      const response = await Promise.all(promises);

      return {
        data: response[0].rows,
        count: response[1].rows[0].total,
      };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async delete(id: Movie["id"]): Promise<void> {
    try {
      if (await this.getById(id)) {
        await this.client.query("DELETE FROM MOVIES WHERE MOVIES.id = $1;", [
          id,
        ]);
      } else {
        throw new Error("id does not exist");
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export { MoviesPostgresRepository };
