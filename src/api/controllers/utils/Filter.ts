import { Request } from "express";

export interface FilterResponse {
    column?: string;
    value?: string;
    sign?: string;
}

export function filter(request: Request): FilterResponse {
    if (request.query.genre) {
        return {
            column: "genre",
            value: request.query.genre as string,
        }
    }
    else {
        if (request.query.imdbScore) {
            const queryValue = request.query.imdbScore as string;
            const separate = queryValue.split(/([<>]=?)/);

            if (separate[1] == ">" || separate[1] == "<") {

                return {
                    column: "imdbScore",
                    value: separate[2],
                    sign: separate[1]
                }
            } else {
                return {
                    column: "imdbScore",
                    value: separate[0],
                    sign: ""
                }
            }
        }
        return {};
    }
}