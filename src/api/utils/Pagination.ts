export interface PaginationResponse {
  startIndex: number;
  endIndex: number;
  page: number;
  limit: number;
}

export function pagination(p: number, l: number): PaginationResponse {
  let page;
  let limit;
  if (validRequest(p, l)) {
    page = p;
    limit = l;
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
    limit,
  };

  return paginationResponse;
}

function validRequest(page: number, limit: number): boolean {
  if (page >= 1) {
    if (limit <= 100) {
      return true;
    }
  }
  return false;
}
