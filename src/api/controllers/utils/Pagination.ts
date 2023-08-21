import { Request } from "express";

export interface PaginationResponse {
    startIndex: number;
    endIndex: number;
}

export function pagination(request: Request): PaginationResponse {
    let page: number;
    let limit: number;

    if (request?.query.page && request.query.limit) {

        page = parseInt(request.query.page as string);
        limit = parseInt(request.query.limit as string);
    } else {

        page = 1;
        limit = 10;
    }

    const startIndex: number = (page - 1) * limit;
    const endIndex: number = page * limit;

    const paginationResponse = {
        startIndex,
        endIndex
    }

    return paginationResponse;
}