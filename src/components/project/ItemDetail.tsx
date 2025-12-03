'use client';

import { useState, useEffect } from 'react';
import { Item } from '@/lib/types';
import { Save, Plus, X } from 'lucide-react';

interface ItemDetailProps {
  item: Item;
  onSave: (updatedItem: Item) => void;
}

export const ItemDetail = ({ item: initialItem, onSave }: ItemDetailProps) => {
  const [item, setItem] = useState(initialItem);
  const [newAttributeKey, setNewAttributeKey] = useState('');

  // Reset state when item changes
  useEffect(() => {
    setItem(initialItem);
  }, [initialItem]);

  const handleAttributeChange = (key: string, value: string) => {
    setItem(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [key]: value
      }
    }));
  };

  const addAttribute = () => {
    if (!newAttributeKey) return;
    setItem(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [newAttributeKey]: ''
      }
    }));
    setNewAttributeKey('');
  };

  const removeAttribute = (key: string) => {
    const newAttributes = { ...item.attributes };
    delete newAttributes[key];
    setItem(prev => ({ ...prev, attributes: newAttributes }));
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-sm text-muted-foreground">Item Details</p>
        </div>
        <button
          onClick={() => onSave(item)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">Item Name</label>
          <input
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
          />
        </div>

        {/* Dynamic Attributes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Attributes</label>
            <div className="flex gap-2">
              <input
                placeholder="New field name..."
                value={newAttributeKey}
                onChange={(e) => setNewAttributeKey(e.target.value)}
                className="bg-background border border-input rounded-md px-2 py-1 text-xs w-32 outline-none"
                onKeyDown={(e) => e.key === 'Enter' && addAttribute()}
              />
              <button
                onClick={addAttribute}
                disabled={!newAttributeKey}
                className="p-1 hover:bg-muted rounded-md disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(item.attributes).map(([key, value]) => (
              <div key={key} className="group relative bg-muted/30 p-3 rounded-lg border border-border/50 hover:border-primary/20 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{key}</label>
                  <button
                    onClick={() => removeAttribute(key)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/10 hover:text-destructive rounded transition-all"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <input
                  value={String(value)}
                  onChange={(e) => handleAttributeChange(key, e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-sm font-medium focus:ring-0 placeholder:text-muted-foreground/50"
                  placeholder="Value..."
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">Notes</label>
          <textarea
            value={item.notes || ''}
            onChange={(e) => setItem({ ...item, notes: e.target.value })}
            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm min-h-[100px] focus:ring-1 focus:ring-primary outline-none resize-none"
            placeholder="Add any additional notes here..."
          />
        </div>
      </div>
    </div>
  );
}
