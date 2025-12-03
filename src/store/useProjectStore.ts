import { create } from 'zustand';
import { Project, Category, Item } from '@/lib/types';
import { MOCK_PROJECTS, MOCK_CATEGORIES, MOCK_ITEMS } from '@/lib/mockData';

interface ProjectState {
  // Data State (Client-side "Database")
  projects: Project[];
  categories: Category[];
  items: Item[];

  // Selection State
  selectedProjectId: string | null;
  selectedCategoryId: string | null;
  selectedItemId: string | null;

  // Actions
  setSelectedProject: (id: string | null) => void;
  setSelectedCategory: (id: string | null) => void;
  setSelectedItem: (id: string | null) => void;

  // CRUD Actions
  addProject: (project: Project) => void;
  addCategory: (category: Category) => void;
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  // Initialize with mock data for demo purposes, but allow mutation
  projects: MOCK_PROJECTS,
  categories: MOCK_CATEGORIES,
  items: MOCK_ITEMS,

  selectedProjectId: null,
  selectedCategoryId: null,
  selectedItemId: null,

  setSelectedProject: (id) => set({ selectedProjectId: id, selectedCategoryId: null, selectedItemId: null }),
  setSelectedCategory: (id) => set({ selectedCategoryId: id, selectedItemId: null }),
  setSelectedItem: (id) => set({ selectedItemId: id }),

  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (updatedItem) => set((state) => ({
    items: state.items.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
  })),
}));
