import { Response } from "express";
import { CustomResponse } from "./Response";
import { StatusCodes } from "http-status-codes";

export function returnResponse(result: CustomResponse, response: Response) {
  if (result.statusCode == StatusCodes.OK) {
    response.json(result.message);
  } else {
    response.status(result.statusCode).send(result.message);
  }
}
