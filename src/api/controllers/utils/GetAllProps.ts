import { Request } from "express";
import { PaginationResponse, pagination } from "./Pagination";

export interface GetAllProps {
    limit: number;
    offset: number;
    filter?:
    {
        field: string;
        value: any;
        operator: string;
    }
}

export function getAllPropsObjectFromRequest(request: Request): GetAllProps {
    const page = parseInt(request.query.page as string);
    const limit = parseInt(request.query.limit as string);

    const paginationResult: PaginationResponse = pagination(page, limit);

    const filterParam = request.query.filter as string;

    let filters;
    let getAllProps;

    if (filterParam) {
        const [field, operator, value] = filterParam.split("||");
        const filterObject = {
            field: field,
            value: parseFloat(value),
            operator: operator
        };
        filters = filterObject;

        getAllProps = {
            limit: paginationResult.endIndex,
            offset: paginationResult.startIndex,
            filter: filters
        };
    } else {
        getAllProps = {
            limit: paginationResult.endIndex,
            offset: paginationResult.startIndex,
        };
    }

    return getAllProps;
}