'use client';

import { useState } from 'react';
import { CategoryNode } from '@/lib/treeUtils';
import { useProjectStore } from '@/store/useProjectStore';
import { ChevronRight, ChevronDown, Folder, Box, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CreateCategoryModal } from './CreateCategoryModal';

interface CategoryTreeProps {
  nodes: CategoryNode[];
  level?: number;
  projectId: string;
}

export const CategoryTree = ({ nodes, level = 0, projectId }: CategoryTreeProps) => {
  return (
    <div className="flex flex-col gap-1">
      {nodes.map((node) => (
        <CategoryNodeItem key={node.id} node={node} level={level} projectId={projectId} />
      ))}
    </div>
  );
}

const CategoryNodeItem = ({ node, level, projectId }: { node: CategoryNode; level: number; projectId: string }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedCategoryId, setSelectedCategory } = useProjectStore();

  const isSelected = selectedCategoryId === node.id;
  const hasChildren = node.children.length > 0;

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategory(node.id);
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleAddSubCategory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <div>
      <div
        className={cn(
          "group flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors text-sm select-none",
          isSelected ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-muted-foreground"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleSelect}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <button
            onClick={toggleExpand}
            className={cn("p-0.5 rounded-sm hover:bg-black/5 dark:hover:bg-white/10 shrink-0", !hasChildren && "invisible")}
          >
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </button>

          {node.type === 'folder' ? (
            <Folder className={cn("h-4 w-4 shrink-0", isSelected ? "fill-primary/20" : "fill-muted/20")} />
          ) : (
            <Box className="h-4 w-4 shrink-0" />
          )}

          <span className="truncate">{node.name}</span>
        </div>

        {node.type === 'folder' && (
          <button
            onClick={handleAddSubCategory}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-background rounded-md transition-all"
            title="Add Sub-category"
          >
            <Plus className="h-3 w-3" />
          </button>
        )}
      </div>

      {isExpanded && hasChildren && (
        <CategoryTree nodes={node.children} level={level + 1} projectId={projectId} />
      )}

      <CreateCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId={projectId}
        parentId={node.id}
      />
    </div>
  );
}
