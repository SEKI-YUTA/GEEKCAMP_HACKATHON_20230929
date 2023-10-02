export interface CategoryType {
  id: number;
  name: string;
}

export interface CategoryResponce {
  categories: CategoryType[];
  categoryName: string;
}
