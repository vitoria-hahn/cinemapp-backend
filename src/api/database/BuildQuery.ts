import {
  DefaultFilter,
  Filter,
  HasFilter,
  SearchFilter,
} from "../filters/Filter";

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
    const hasStrategy = new HasFilter();
    const searchStrategy = new SearchFilter();
    const defaultStrategy = new DefaultFilter();
    if (filter.operator === Operator.has) {
      return hasStrategy.apply(filter, alias);
    } else if (filter.operator === Operator.search) {
      return searchStrategy.apply(filter, alias);
    } else {
      return defaultStrategy.apply(filter, alias);
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
