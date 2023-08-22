import { Request } from "express";

export interface FilterResponse {
    column?: string;
    value?: string;
}

export function filter(request: Request): FilterResponse {
    if (request.query.genre) {
        return {
            column: "genre",
            value: request.query.genre as string
        }
    }
    else {
        return {};
    }
}