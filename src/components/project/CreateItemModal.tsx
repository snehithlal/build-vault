'use client';

import { useState } from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import { X, Plus, Trash2 } from 'lucide-react';
import { Item } from '@/lib/types';

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
}

export const CreateItemModal = ({ isOpen, onClose, categoryId }: CreateItemModalProps) => {
  const { addItem } = useProjectStore();
  const [name, setName] = useState('');
  const [attributes, setAttributes] = useState<Record<string, string>>({});
  const [newAttrKey, setNewAttrKey] = useState('');
  const [newAttrValue, setNewAttrValue] = useState('');

  if (!isOpen) return null;

  const handleAddAttribute = () => {
    if (newAttrKey && newAttrValue) {
      setAttributes(prev => ({ ...prev, [newAttrKey]: newAttrValue }));
      setNewAttrKey('');
      setNewAttrValue('');
    }
  };

  const handleRemoveAttribute = (key: string) => {
    setAttributes(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      category_id: categoryId,
      name,
      attributes,
    };

    addItem(newItem);
    onClose();
    setName('');
    setAttributes({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Create New Item</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-md transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ceramic Tile"
              className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Attributes</label>

            {/* Attribute List */}
            <div className="space-y-2">
              {Object.entries(attributes).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 bg-muted/50 p-2 rounded-md text-sm">
                  <span className="font-medium">{key}:</span>
                  <span className="flex-1 text-muted-foreground">{value}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttribute(key)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Attribute Inputs */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Key (e.g. Price)"
                value={newAttrKey}
                onChange={(e) => setNewAttrKey(e.target.value)}
                className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
              />
              <input
                type="text"
                placeholder="Value (e.g. $50)"
                value={newAttrValue}
                onChange={(e) => setNewAttrValue(e.target.value)}
                className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
              />
              <button
                type="button"
                onClick={handleAddAttribute}
                disabled={!newAttrKey || !newAttrValue}
                className="p-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 disabled:opacity-50 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Create Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
