interface Filter {
    field: string;
    value: any;
    operator: string;
}

export function buildSqlRawSelectQuery(tableName: string, limit: number, offset: number, filters?: Filter[]): string {
    let query = `SELECT * FROM ${tableName}`;

    if (filters && filters.length > 0) {
        query += ' WHERE ';
        const filterConditions = filters.map(filter => {
            if (filter.field === "genre") {
                return `'${filter.value}' = ANY (${tableName}.${filter.field})`;
            } else {
                return `${filter.field} ${filter.operator} ${filter.value}`;
            }
        });

        query += filterConditions.join(' AND ');
    }

    query += ` LIMIT ${limit} OFFSET ${offset};`;

    return query;
}

export function buildSqlRawCountQuery(tableName: string, filters?: Filter[]): string {
    let query = `SELECT COUNT(*) as total FROM ${tableName}`;

    if (filters && filters.length > 0) {
        query += ' WHERE ';
        const filterConditions = filters.map(filter => {
            if (filter.field === "genre") {
                return `'${filter.value}' = ANY (${tableName}.${filter.field})`;
            } else {
                return `${filter.field} ${filter.operator} ${filter.value}`;
            }
        });

        query += filterConditions.join(' AND ');
    }

    return query;
}