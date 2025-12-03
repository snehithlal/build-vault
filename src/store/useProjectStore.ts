import { create } from 'zustand';
import { Project, Category, Item } from '@/lib/types';
import { createClient } from '@/utils/supabase/client';

interface ProjectState {
  // Data State
  projects: Project[];
  categories: Category[];
  items: Item[];
  isLoading: boolean;

  // Selection State
  selectedProjectId: string | null;
  selectedCategoryId: string | null;
  selectedItemId: string | null;

  // Actions
  setSelectedProject: (id: string | null) => void;
  setSelectedCategory: (id: string | null) => void;
  setSelectedItem: (id: string | null) => void;

  // Data Fetching
  fetchProjects: () => Promise<void>;
  fetchProject: (id: string) => Promise<void>;
  fetchCategories: (projectId: string) => Promise<void>;
  fetchItems: (categoryId?: string) => Promise<void>;

  // CRUD Actions
  addProject: (project: Omit<Project, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  addCategory: (category: Omit<Category, 'created_at'>) => Promise<void>;
  addItem: (item: Omit<Item, 'created_at'>) => Promise<void>;
  updateItem: (item: Item) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  // Initial State
  projects: [],
  categories: [],
  items: [],
  isLoading: false,

  selectedProjectId: null,
  selectedCategoryId: null,
  selectedItemId: null,

  // Actions
  setSelectedProject: (id) => set({ selectedProjectId: id, selectedCategoryId: null, selectedItemId: null }),
  setSelectedCategory: (id) => set({ selectedCategoryId: id, selectedItemId: null }),
  setSelectedItem: (id) => set({ selectedItemId: id }),

  // Data Fetching
  fetchProjects: async () => {
    set({ isLoading: true });
    const supabase = createClient();
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      set({ projects: data });
    }
    set({ isLoading: false });
  },

  fetchProject: async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
    if (!error && data) {
      set((state) => ({
        projects: state.projects.some(p => p.id === data.id)
          ? state.projects.map(p => p.id === data.id ? data : p)
          : [...state.projects, data]
      }));
    }
  },

  fetchCategories: async (projectId) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('categories').select('*').eq('project_id', projectId);
    if (!error && data) {
      set({ categories: data });
    }
  },

  fetchItems: async (categoryId) => {
    // We might want to fetch all items for a project or just for a category.
    // For now, let's fetch all items for the current project's categories to keep it simple,
    // or we can fetch on demand.
    // Let's fetch all items for the loaded categories to avoid N+1.
    const state = get();
    const categoryIds = state.categories.map(c => c.id);
    if (categoryIds.length === 0) return;

    const supabase = createClient();
    const { data, error } = await supabase.from('items').select('*').in('category_id', categoryIds);
    if (!error && data) {
      set({ items: data });
    }
  },

  // CRUD Actions
  addProject: async (project) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newProject = { ...project, user_id: user.id };
    const { data, error } = await supabase.from('projects').insert(newProject).select().single();

    if (!error && data) {
      set((state) => ({ projects: [data, ...state.projects] }));
    }
  },

  addCategory: async (category) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('categories').insert(category).select().single();

    if (!error && data) {
      set((state) => ({ categories: [...state.categories, data] }));
    }
  },

  addItem: async (item) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('items').insert(item).select().single();

    if (!error && data) {
      set((state) => ({ items: [...state.items, data] }));
    }
  },

  updateItem: async (updatedItem) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('items')
      .update({ name: updatedItem.name, attributes: updatedItem.attributes })
      .eq('id', updatedItem.id)
      .select()
      .single();

    if (!error && data) {
      set((state) => ({
        items: state.items.map((i) => (i.id === data.id ? data : i)),
      }));
    }
  },
}));
