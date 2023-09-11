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
  src = "src",
}

function paginationQuery(limit: number, offset: number) {
  let query = "";

  query += ` LIMIT ${limit} OFFSET ${offset};`;

  return query;
}

function filterQuery(filters: Filter[], alias: string) {
  let query = "";

  if (filters && filters.length > 0 && Array.isArray(filters)) {
    query += " WHERE ";
    const filterConditions = filters.map((filter) => {
      if (filter.operator === Operator.has) {
        return `'${filter.value}' = ANY (${alias}.${filter.field})`;
      } else if (filter.operator === Operator.src) {
        return `to_tsvector('english', unaccent(${alias}.${filter.field})) @@ to_tsquery('english', '${filter.value}:*')`;
      } else {
        return `${filter.field} ${filter.operator} ${filter.value}`;
      }
    });

    query += filterConditions.join(" AND ");
  }

  return query;
}

export function buildSqlRawSelectQuery(
  tableName: string,
  alias: string,
  limit: number,
  offset: number,
  filters?: Filter[],
): string {
  let query = `SELECT * FROM ${tableName} AS ${alias}`;

  if (filters) {
    query += filterQuery(filters, alias);
  }

  paginationQuery(limit, offset);
  console.log(query);

  return query;
}

export function buildSqlRawCountQuery(
  tableName: string,
  alias: string,
  filters?: Filter[],
): string {
  let query = `SELECT COUNT(*) as total FROM ${tableName} AS ${alias}`;

  if (filters) {
    query += filterQuery(filters, alias);
  }

  return query;
}
