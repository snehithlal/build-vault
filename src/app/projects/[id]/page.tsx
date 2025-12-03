'use client';

import { buildCategoryTree } from '@/lib/treeUtils';
import { CategoryTree } from '@/components/project/CategoryTree';
import { ItemList } from '@/components/project/ItemList';
import { ItemDetail } from '@/components/project/ItemDetail';
import { CreateCategoryModal } from '@/components/project/CreateCategoryModal';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { useProjectStore } from '@/store/useProjectStore';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Settings, Share2, Plus, Box, Menu } from 'lucide-react';

const ProjectPage = () => {
  const params = useParams();
  const projectId = params.id as string;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Store data
  const { projects, categories } = useProjectStore();
  const project = projects.find(p => p.id === projectId);
  const projectCategories = categories.filter(c => c.projectId === projectId);

  const tree = buildCategoryTree(projectCategories);

  if (!project) return <div className="p-8">Project not found</div>;

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 -ml-2 hover:bg-muted rounded-md"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground hidden md:block">
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
      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Sidebar */}
        <aside className="w-64 border-r border-border bg-card/50 flex flex-col hidden md:flex">
          <div className="p-3 border-b border-border/50 flex gap-2">
            <input
              type="text"
              placeholder="Search categories..."
              className="flex-1 bg-muted/50 border-none text-xs h-8 rounded px-3 focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded hover:bg-primary/90"
              title="Add Root Category"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <CategoryTree nodes={tree} projectId={projectId} />
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          <div className="p-3 border-b border-border/50 flex gap-2">
            <input
              type="text"
              placeholder="Search categories..."
              className="flex-1 bg-muted/50 border-none text-xs h-8 rounded px-3 focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded hover:bg-primary/90"
              title="Add Root Category"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="p-2">
            <CategoryTree nodes={tree} projectId={projectId} />
          </div>
        </MobileSidebar>

        {isCreateModalOpen && (
          <CreateCategoryModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            projectId={projectId}
            parentId={null}
          />
        )}

        {/* Main Area - Item Details */}
        <main className="flex-1 bg-muted/10 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <ProjectContent />
          </div>
        </main>
      </div>
    </div>
  );
}

const ProjectContent = () => {
  const { selectedCategoryId, selectedItemId, items, categories } = useProjectStore();

  // Filter items for the selected category
  const categoryItems = items.filter(i => i.categoryId === selectedCategoryId);
  const selectedItem = items.find(i => i.id === selectedItemId);
  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

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
          <div>
            <h2 className="text-2xl font-bold">{selectedCategory?.name || 'Items'}</h2>
            <p className="text-sm text-muted-foreground">Manage items in this category</p>
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>
        <ItemList items={categoryItems} />
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

export default ProjectPage;
