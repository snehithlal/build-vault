'use client';

import { useQuery } from '@tanstack/react-query';
import { MOCK_CATEGORIES, MOCK_PROJECTS, MOCK_ITEMS } from '@/lib/mockData';
import { buildCategoryTree } from '@/lib/treeUtils';
import { CategoryTree } from '@/components/project/CategoryTree';
import { ItemList } from '@/components/project/ItemList';
import { ItemDetail } from '@/components/project/ItemDetail';
import { useProjectStore } from '@/store/useProjectStore';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Settings, Share2, Plus, Box } from 'lucide-react';

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  // Mock fetchers
  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => MOCK_PROJECTS.find(p => p.id === projectId),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories', projectId],
    queryFn: async () => MOCK_CATEGORIES.filter(c => c.projectId === projectId),
  });

  const tree = categories ? buildCategoryTree(categories) : [];

  if (!project) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-semibold text-sm">{project.name}</h1>
            <p className="text-xs text-muted-foreground">{project.clientName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded-md text-muted-foreground">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-muted rounded-md text-muted-foreground">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Category Tree */}
        <aside className="w-64 border-r border-border bg-card/50 flex flex-col">
          <div className="p-3 border-b border-border/50">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full bg-muted/50 border-none text-xs h-8 rounded px-3 focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <CategoryTree nodes={tree} />
          </div>
        </aside>

        {/* Main Area - Item Details */}
        <main className="flex-1 bg-muted/10 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <ProjectContent projectId={projectId} />
          </div>
        </main>
      </div>
    </div>
  );
}

function ProjectContent({ projectId }: { projectId: string }) {
  const { selectedCategoryId, selectedItemId } = useProjectStore();

  // Fetch items for the selected category
  const { data: items } = useQuery({
    queryKey: ['items', selectedCategoryId],
    queryFn: async () => {
      if (!selectedCategoryId) return [];
      return MOCK_ITEMS.filter(i => i.categoryId === selectedCategoryId);
    },
    enabled: !!selectedCategoryId,
  });

  // Fetch selected item details
  const { data: selectedItem } = useQuery({
    queryKey: ['item', selectedItemId],
    queryFn: async () => MOCK_ITEMS.find(i => i.id === selectedItemId),
    enabled: !!selectedItemId,
  });

  if (selectedItemId && selectedItem) {
    return (
      <ItemDetail
        item={selectedItem}
        onSave={(updated) => console.log('Save:', updated)}
      />
    );
  }

  if (selectedCategoryId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Items</h2>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>
        <ItemList items={items || []} />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed border-muted rounded-lg">
        <Box className="h-12 w-12 mb-4 opacity-20" />
        <p>Select a category to view items</p>
      </div>
    </div>
  );
}
