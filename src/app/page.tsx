import { ProjectList } from '@/components/dashboard/ProjectList';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">B</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">BuildVault</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
              US
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-7xl py-8">
        <div className="px-6 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground mt-2">Manage your construction projects and clients.</p>
        </div>

        <ProjectList />
      </div>
    </main>
  );
}
