export interface Content {
  title: string;
  mediaUrl: string;
  mediaType: "YOUTUBE" | string;
  thumbnailUrl: string;
  slug: string;
}

export interface Category {
  slug: string;
  name: string;
  iconUrl: string;
}

export interface CategoryWithContents {
  category: Category;
  contents: Content[];
}

export interface Dataset {
  categories: CategoryWithContents[];
}

