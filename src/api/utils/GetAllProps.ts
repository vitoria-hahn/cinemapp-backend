import { Request } from "express";
import { PaginationResponse, pagination } from "./Pagination";

export interface GetAllProps {
  limit: number;
  offset: number;
  filter?: [
    {
      field: string;
      value: any;
      operator: string;
    },
  ];
}

function parseFilters(filterParam: string): any {
  if (!filterParam) {
    return null;
  }

  const filterClauses = filterParam.split(",");
  const filters = filterClauses.map((filterClause) => {
    const [field, operator, value] = filterClause.split("||");
    return {
      field: field,
      value: value,
      operator: operator,
    };
  });

  if (filters.length === 1) {
    return filters[0];
  } else {
    return filters;
  }
}

export function getAllPropsObjectFromRequest(request: Request): GetAllProps {
  const page = parseInt(request.query.page as string);
  const limit = parseInt(request.query.limit as string);

  const paginationResult: PaginationResponse = pagination(page, limit);

  const filterParam = request.query.filter as string;

  const filters = parseFilters(filterParam);

  const getAllProps: GetAllProps = {
    limit: paginationResult.endIndex,
    offset: paginationResult.startIndex,
    filter: filters,
  };

  return getAllProps;
}
