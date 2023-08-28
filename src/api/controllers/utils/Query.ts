interface Filter {
    field: string;
    value: any;
    operator: string;
}

const validColumns = ["genre", "imdbScore", "title", "director", "year"];

export function buildSqlRawSelectQuery(tableName: string, limit: number, offset: number, filters?: Filter[]): string {
    const alias = "movie";

    let query = `SELECT * FROM ${tableName} as ${alias}`;

    if (filters && filters.length > 0) {
        query += ' WHERE ';
        const filterConditions = filters.map(filter => {
            if (validColumns.includes(filter.field)) {
                if (filter.field === "genre") {
                    return `'${filter.value}' = ANY (${alias}.${filter.field})`;
                } else {
                    return `${filter.field} ${filter.operator} ${filter.value}`;
                }
            } else {
                throw SyntaxError("invalid column to filter");
            }
        });

        query += filterConditions.join(' AND ');
    }

    query += ` LIMIT ${limit} OFFSET ${offset};`;

    return query;
}

export function buildSqlRawCountQuery(tableName: string, filters?: Filter[]): string {
    const alias = "movie";

    let query = `SELECT COUNT(*) as total FROM ${tableName} AS ${alias}`;

    if (filters && filters.length > 0) {
        query += ' WHERE ';
        const filterConditions = filters.map(filter => {
            if (filter.field === "genre") {
                return `'${filter.value}' = ANY (${alias}.${filter.field})`;
            } else {
                return `${filter.field} ${filter.operator} ${filter.value}`;
            }
        });

        query += filterConditions.join(' AND ');
    }

    return query;
}