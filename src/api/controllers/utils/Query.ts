interface Filter {
    field: string;
    value: any;
    operator: string;
}

export function buildSqlRawSelectQuery(tableName: string, limit: number, offset: number, filter?: Filter): string {
    let query = `SELECT * FROM ${tableName}`;

    if (filter) {
        query += ' WHERE ';
        const filterCondition = `${filter.field} ${filter.operator} ${filter.value}`;
        query += filterCondition;
    }

    query += ` LIMIT ${limit} OFFSET ${offset};`;

    return query;
}

export function buildSqlRawCountQuery(tableName: string, filter?: Filter): string {
    let query = `SELECT COUNT(*) as total FROM ${tableName}`;

    if (filter) {
        query += ' WHERE ';
        const filterCondition = `${filter.field} ${filter.operator} ${filter.value};`;
        query += filterCondition;
    }

    return query;
}