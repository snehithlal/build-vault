'use client';

import { Item } from '@/lib/types';
import { useProjectStore } from '@/store/useProjectStore';
import { Box, ChevronRight } from 'lucide-react';

interface ItemListProps {
  items: Item[];
}

export function ItemList({ items }: ItemListProps) {
  const { setSelectedItem } = useProjectStore();

  if (items.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground border-2 border-dashed border-muted rounded-xl">
        No items in this category yet.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => setSelectedItem(item.id)}
          className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-sm cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
              <Box className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium group-hover:text-primary transition-colors">{item.name}</h3>
              <div className="flex gap-2 text-xs text-muted-foreground">
                {Object.entries(item.attributes).slice(0, 3).map(([k, v]) => (
                  <span key={k} className="bg-muted px-1.5 py-0.5 rounded">
                    {k}: {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </div>
      ))}
    </div>
  );
}
