import { Category } from './types';

export interface CategoryNode extends Category {
  children: CategoryNode[];
}

export const buildCategoryTree = (categories: Category[]): CategoryNode[] => {
  const map = new Map<string, CategoryNode>();
  const roots: CategoryNode[] = [];

  // Initialize map
  categories.forEach((cat) => {
    map.set(cat.id, { ...cat, children: [] });
  });

  // Build tree
  categories.forEach((cat) => {
    const node = map.get(cat.id)!;
    if (cat.parentId) {
      const parent = map.get(cat.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        // Handle orphan or missing parent case gracefully
        roots.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  return roots;
}
