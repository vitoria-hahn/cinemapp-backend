import { DeleteMovieService } from "../services/DeleteMovieService";
import { Request, Response } from "express";

class DeleteMovieController {
    constructor(private deleteMovieService: DeleteMovieService) { }
    async handle(request: Request, response: Response) {
        const result = await this.deleteMovieService.delete(request.params.id);

        return response.send(result);
    }
}

export { DeleteMovieController };
