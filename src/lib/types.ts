export interface Project {
  id: string;
  name: string;
  clientName: string;
  createdAt: string;
  status: 'active' | 'completed' | 'archived';
}

export interface Category {
  id: string;
  projectId: string;
  parentId: string | null;
  name: string;
  type: 'folder' | 'item_group';
  // For UI state (optional)
  isOpen?: boolean;
}

export interface Item {
  id: string;
  categoryId: string;
  name: string;
  // Dynamic attributes for the item (e.g., price, brand, color)
  attributes: Record<string, string | number | boolean>;
  notes?: string;
  images?: string[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  structure: {
    categories: Omit<Category, 'id' | 'projectId'>[];
    items: Omit<Item, 'id' | 'categoryId'>[];
  };
}
