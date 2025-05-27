export interface Column<T> {
  label: string;
  key?: keyof T; // clé du champ à afficher
  render?: (item: T, index?: number) => React.ReactNode; // fonction personnalisée pour afficher la cellule
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationData<T> {
  data: T[];
  links: PaginationLink[];
}

export interface DataTableProps<T extends object> {
  title?: string;
  columns: Column<T>[];
  data: T[];
  pagination?: PaginationData<T>;
}
