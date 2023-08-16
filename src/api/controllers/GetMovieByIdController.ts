import { GetMovieByIdService } from "../services/GetMovieByIdService";
import { Request, Response } from "express";

class GetMovieByIdController {
    constructor(private getMovieByIdService: GetMovieByIdService) { }
    async handle(request: Request, response: Response) {
        const result = await this.getMovieByIdService.getById(request.params.id);

        return response.send(result);
    }
}

export { GetMovieByIdController };