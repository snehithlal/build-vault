'use client';

import { useState } from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import { X } from 'lucide-react';
import { Category } from '@/lib/types';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  parentId: string | null;
}

export const CreateCategoryModal = ({ isOpen, onClose, projectId, parentId }: CreateCategoryModalProps) => {
  const { addCategory } = useProjectStore();
  const [name, setName] = useState('');
  const [type, setType] = useState<'folder' | 'item_group'>('folder');

  // State is reset automatically when component unmounts (modal closes)

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newCategory: Category = {
      id: crypto.randomUUID(),
      project_id: projectId,
      parent_id: parentId,
      name,
      type,
    };

    addCategory(newCategory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {parentId ? 'Create Sub-Category' : 'Create Category'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-md transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Flooring"
              className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={type === 'folder'}
                  onChange={() => setType('folder')}
                  className="text-primary focus:ring-primary"
                />
                Folder (Contains other categories)
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={type === 'item_group'}
                  onChange={() => setType('item_group')}
                  className="text-primary focus:ring-primary"
                />
                Item Group (Contains items)
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
