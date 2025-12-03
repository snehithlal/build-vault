import { Category, Item, Project, Template } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Modern Villa - Smith Residence',
    clientName: 'John Smith',
    createdAt: '2023-10-25T10:00:00Z',
    status: 'active',
  },
  {
    id: '2',
    name: 'Downtown Office Renovation',
    clientName: 'TechCorp Inc.',
    createdAt: '2023-11-12T14:30:00Z',
    status: 'active',
  },
];

export const MOCK_CATEGORIES: Category[] = [
  // Project 1 Categories
  { id: 'c1', projectId: '1', parentId: null, name: 'Flooring', type: 'folder' },
  { id: 'c2', projectId: '1', parentId: 'c1', name: 'Living Room', type: 'item_group' },
  { id: 'c3', projectId: '1', parentId: 'c1', name: 'Kitchen', type: 'item_group' },
  { id: 'c4', projectId: '1', parentId: null, name: 'Plumbing', type: 'folder' },
  { id: 'c5', projectId: '1', parentId: 'c4', name: 'Master Bath', type: 'item_group' },
];

export const MOCK_ITEMS: Item[] = [
  {
    id: 'i1',
    categoryId: 'c2',
    name: 'Italian Marble',
    attributes: {
      price: 120,
      unit: 'sqft',
      brand: 'Carrara',
      supplier: 'Stone World',
    },
    notes: 'Premium selection, requires sealing.',
  },
  {
    id: 'i2',
    categoryId: 'c3',
    name: 'Ceramic Tiles',
    attributes: {
      price: 45,
      unit: 'sqft',
      brand: 'Marazzi',
      color: 'Beige',
    },
  },
];

export const MOCK_TEMPLATES: Template[] = [
  {
    id: 't1',
    name: 'Residential House Standard',
    description: 'Standard categories for a full house build.',
    structure: {
      categories: [], // Populated structure would go here
      items: [],
    },
  },
];
