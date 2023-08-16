import { GetAllMoviesService } from "../services/GetAllMoviesService";
import { Response } from "express";

class GetAllMoviesController {
    constructor(private getAllMoviesService: GetAllMoviesService) { }
    async handle(response: Response) {
        const result = await this.getAllMoviesService.getAll();

        return response.send(result);
    }
}

export { GetAllMoviesController };