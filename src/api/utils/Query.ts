interface Filter {
    field: string;
    value: any;
    operator: string;
}

enum Operator {
    eq = "=",
    gt = ">",
    ls = "<",
    has = "has",
}

export function buildSqlRawSelectQuery(tableName: string, alias: string, limit: number, offset: number, filters?: Filter[]): string {
    let query = `SELECT * FROM ${tableName} AS ${alias}`;

    if (filters && filters.length > 0) {
        query += ' WHERE ';
        const filterConditions = filters.map(filter => {
            if (filter.operator === Operator.has) {
                return `'${filter.value}' = ANY (${alias}.${filter.field})`;
            } else {
                return `${filter.field} ${filter.operator} ${filter.value}`;
            }
        });

        query += filterConditions.join(' AND ');
    }

    query += ` LIMIT ${limit} OFFSET ${offset};`;

    return query;
}

export function buildSqlRawCountQuery(tableName: string, alias: string, filters?: Filter[]): string {
    let query = `SELECT COUNT(*) as total FROM ${tableName} AS ${alias}`;

    if (filters && filters.length > 0) {
        query += ' WHERE ';
        const filterConditions = filters.map(filter => {
            if (filter.operator === Operator.has) {
                return `'${filter.value}' = ANY (${alias}.${filter.field})`;
            } else {
                return `${filter.field} ${filter.operator} ${filter.value}`;
            }
        });

        query += filterConditions.join(' AND ');
    }

    return query;
}