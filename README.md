# BuildVault

BuildVault is a project management application designed for architects and builders. It allows managing multiple clients and projects with a flexible, hierarchical category system and dynamic item details.

## Features

-   **Project Management**: Create and manage construction projects.
-   **Recursive Categories**: Infinite nesting of categories (e.g., Flooring -> Living Room -> Tiles).
-   **Dynamic Item Details**: Add custom attributes (Price, Brand, Color, etc.) to any item on the fly.
-   **Templates**: (Coming Soon) Reusable project structures.
-   **Premium UI**: Modern, dark-mode first design with glassmorphism effects.
-   **Mobile Friendly**: Responsive design with mobile sidebar navigation.

## Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Styling**: Tailwind CSS v4
-   **State Management**: Zustand
-   **Data Fetching**: React Query
-   **Icons**: Lucide React

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

-   `src/app`: Next.js App Router pages and layouts.
-   `src/components`: Reusable UI components.
    -   `dashboard`: Components for the main dashboard (Project List, etc.).
    -   `project`: Components for the project detail view (Category Tree, Item Details).
    -   `layout`: Layout components (Sidebar, etc.).
-   `src/lib`: Utility functions and types.
-   `src/store`: Zustand state store.

## Supabase Setup

BuildVault uses Supabase for authentication and database.

### 1. Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Migration

The database schema is managed via Supabase migrations.

**For Local Development:**
1.  Install Supabase CLI: `brew install supabase/tap/supabase`
2.  Login: `supabase login`
3.  Link Project: `supabase link --project-ref your_project_ref`
4.  Push Schema: `supabase db push`

**For Production (Vercel):**
It is recommended to use GitHub Actions to automatically push migrations on merge. Alternatively, you can run `supabase db push` from your local machine linked to the production project.

### 3. Authentication

-   **Email/Password**: Enabled by default.
-   **Email Confirmation**: For development, you may want to disable "Confirm email" in Supabase Authentication -> Providers -> Email settings to allow instant login with dummy emails.
