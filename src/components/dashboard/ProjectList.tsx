'use client';

import { useProjectStore } from '@/store/useProjectStore';
import Link from 'next/link';
import { Folder, Plus } from 'lucide-react';



export function ProjectList() {
  const { projects } = useProjectStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* New Project Card */}
      <button className="group relative flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-muted hover:border-primary/50 hover:bg-muted/50 transition-all duration-300">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Plus className="h-6 w-6 text-primary" />
        </div>
        <span className="mt-4 font-medium text-muted-foreground group-hover:text-primary">Create New Project</span>
      </button>

      {/* Project Cards */}
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="group relative flex flex-col h-48 rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Folder className="h-5 w-5 text-blue-500" />
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              project.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'
            }`}>
              {project.status}
            </span>
          </div>

          <div className="mt-auto">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{project.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{project.clientName}</p>
            <div className="mt-4 text-xs text-muted-foreground">
              Created {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
