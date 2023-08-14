import { v4 as uuidV4 } from "uuid";

class Movie {
  id: string;
  title: string;
  year: string;
  genre: string;
  director: string;
  minutes: number;
  imdbScore: number;
  summary: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Movie };
