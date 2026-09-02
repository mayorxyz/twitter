import { create } from 'zustand';

interface UIState {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Modal states
  isCreateRequestModalOpen: boolean;
  openCreateRequestModal: () => void;
  closeCreateRequestModal: () => void;
  
  // Sidebar state (for desktop dashboard)
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Theme - default to dark mode for this audience
  theme: 'dark',
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  },
  
  // Create Request Modal
  isCreateRequestModalOpen: false,
  openCreateRequestModal: () => set({ isCreateRequestModalOpen: true }),
  closeCreateRequestModal: () => set({ isCreateRequestModalOpen: false }),
  
  // Sidebar
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),
}));

// Initialize theme on mount
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  useUIStore.setState({ theme: initialTheme });
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      useUIStore.setState({ theme: newTheme });
    }
  });
}

// Persist theme changes
useUIStore.subscribe(
  (state) => state.theme,
  (theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
);
