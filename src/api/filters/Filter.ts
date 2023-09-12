export interface Filter {
  field: string;
  operator: string;
  value: string;
}

export interface FilterStrategy {
  apply(filter: Filter, alias: string): string;
}

export class HasFilter implements FilterStrategy {
  apply(filter: Filter, alias: string): string {
    return `'${filter.value}' = ANY (${alias}.${filter.field})`;
  }
}

export class SearchFilter implements FilterStrategy {
  apply(filter: Filter, alias: string): string {
    return `to_tsvector('english', unaccent(${alias}.${filter.field})) @@ to_tsquery('english', '${filter.value}:*')`;
  }
}

export class DefaultFilter implements FilterStrategy {
  apply(filter: Filter, alias: string): string {
    return `${alias}.${filter.field} ${filter.operator} ${filter.value}`;
  }
}
