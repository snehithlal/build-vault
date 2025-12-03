export interface Project {
  id: string;
  user_id?: string;
  name: string;
  client_name: string;
  created_at: string;
  status: 'active' | 'completed' | 'archived';
}

export interface Category {
  id: string;
  project_id: string;
  parent_id: string | null;
  name: string;
  type: 'folder' | 'item_group';
  created_at?: string;
  // For UI state (optional)
  isOpen?: boolean;
}

export interface Item {
  id: string;
  category_id: string;
  name: string;
  // Dynamic attributes for the item (e.g., price, brand, color)
  attributes: Record<string, string | number | boolean>;
  created_at?: string;
  notes?: string;
  images?: string[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  structure: {
    categories: Omit<Category, 'id' | 'project_id'>[];
    items: Omit<Item, 'id' | 'category_id'>[];
  };
}
