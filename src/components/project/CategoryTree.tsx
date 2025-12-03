'use client';

import { useState } from 'react';
import { CategoryNode } from '@/lib/treeUtils';
import { useProjectStore } from '@/store/useProjectStore';
import { ChevronRight, ChevronDown, Folder, Box, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryTreeProps {
  nodes: CategoryNode[];
  level?: number;
}

export function CategoryTree({ nodes, level = 0 }: CategoryTreeProps) {
  return (
    <div className="flex flex-col gap-1">
      {nodes.map((node) => (
        <CategoryNodeItem key={node.id} node={node} level={level} />
      ))}
    </div>
  );
}

function CategoryNodeItem({ node, level }: { node: CategoryNode; level: number }) {
  const [isExpanded, setIsExpanded] = useState(true);
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

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors text-sm select-none",
          isSelected ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-muted-foreground"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleSelect}
      >
        <button
          onClick={toggleExpand}
          className={cn("p-0.5 rounded-sm hover:bg-black/5 dark:hover:bg-white/10", !hasChildren && "invisible")}
        >
          {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        </button>

        {node.type === 'folder' ? (
          <Folder className={cn("h-4 w-4", isSelected ? "fill-primary/20" : "fill-muted/20")} />
        ) : (
          <Box className="h-4 w-4" />
        )}

        <span className="truncate">{node.name}</span>
      </div>

      {isExpanded && hasChildren && (
        <CategoryTree nodes={node.children} level={level + 1} />
      )}
    </div>
  );
}
