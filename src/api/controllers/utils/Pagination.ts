import { Request } from "express";

export interface PaginationResponse {
    startIndex: number;
    endIndex: number;
    page: number;
    limit: number;
}

export function pagination(request: Request): PaginationResponse {
    let page: number;
    let limit: number;

    if (validRequest(request)) {
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
        endIndex,
        page,
        limit
    }

    return paginationResponse;
}

function validRequest(request: Request): Boolean {
    if (request.query.page && parseInt(request.query.page as string) >= 1) {
        if (request.query.limit && parseInt(request.query.limit as string) >= 1 && parseInt(request.query.limit as string) <= 100) {
            return true;
        }
    }
    return false;
}