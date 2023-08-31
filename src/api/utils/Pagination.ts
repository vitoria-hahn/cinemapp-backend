export interface PaginationResponse {
    startIndex: number;
    endIndex: number;
    page: number;
    limit: number;
}

export function pagination(page: number, limit: number): PaginationResponse {
    if (validRequest(page, limit)) {
        page = page;
        limit = limit;
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

function validRequest(page: number, limit: number): Boolean {
    if (page >= 1) {
        if (limit <= 100) {
            return true;
        }
    }
    return false;
}