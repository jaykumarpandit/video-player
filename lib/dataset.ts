import { Dataset } from "@/types/dataset";
import dataset from "@/data/dataset.json";

/**
 * Safely loads and returns the dataset
 * @returns The dataset with proper typing
 */
export function getDataset(): Dataset {
  return dataset as Dataset;
}

/**
 * Gets all categories from the dataset
 */
export function getCategories() {
  return getDataset().categories;
}

/**
 * Gets a specific category by slug
 */
export function getCategoryBySlug(slug: string) {
  return getCategories().find((cat) => cat.category.slug === slug);
}

/**
 * Gets all contents from a specific category
 */
export function getContentsByCategorySlug(slug: string) {
  const category = getCategoryBySlug(slug);
  return category?.contents || [];
}

/**
 * Gets a specific content item by slug
 */
export function getContentBySlug(slug: string) {
  for (const category of getCategories()) {
    const content = category.contents.find((item) => item.slug === slug);
    if (content) return content;
  }
  return null;
}

