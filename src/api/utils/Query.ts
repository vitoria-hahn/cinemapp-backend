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
  search = "search",
}

function buildPaginationQuery(limit: number, offset: number) {
  return ` LIMIT ${limit} OFFSET ${offset};`;
}

function buildFilterQuery(filters: Filter[], alias: string) {
  if (!filters || filters.length === 0 || !Array.isArray(filters)) {
    return "";
  }

  let query = " WHERE ";
  const filterConditions = filters.map((filter) => {
    if (filter.operator === Operator.has) {
      return `'${filter.value}' = ANY (${alias}.${filter.field})`;
    } else if (filter.operator === Operator.search) {
      return `to_tsvector('english', unaccent(${alias}.${filter.field})) @@ to_tsquery('english', '${filter.value}:*')`;
    } else {
      return `${filter.field} ${filter.operator} ${filter.value}`;
    }
  });

  query += filterConditions.join(" AND ");

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
    query += buildFilterQuery(filters, alias);
  }

  buildPaginationQuery(limit, offset);
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
    query += buildFilterQuery(filters, alias);
  }

  return query;
}
