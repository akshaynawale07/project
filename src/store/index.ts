import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole, MapFilter } from '../types';

interface AppState {
  user: User | null;
  darkMode: boolean;
  mapFilters: MapFilter[];
  setUser: (user: User) => void;
  setDarkMode: (darkMode: boolean) => void;
  toggleMapFilter: (filterId: string) => void;
  addPoints: (points: number) => void;
  addBadge: (badge: string) => void;
  updateEcoAction: (action: keyof User['gamification']['ecoActions'], value: number) => void;
  toggleEventBookmark: (eventId: string) => void;
  updateRSVP: (eventId: string, status: 'going' | 'maybe' | 'not-going') => void;
}

const DEFAULT_MAP_FILTERS: MapFilter[] = [
  { id: 'landmarks', name: 'Landmarks', category: 'landmark', isActive: true },
  { id: 'parking', name: 'Parking', category: 'parking', isActive: false },
  { id: 'transport', name: 'Public Transport', category: 'transport', isActive: false },
  { id: 'eco', name: 'Eco Zones', category: 'eco', isActive: false },
  { id: 'tourist', name: 'Tourist Spots', category: 'tourist', isActive: false },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      darkMode: false,
      mapFilters: DEFAULT_MAP_FILTERS,
      setUser: (user) => set({ user }),
      setDarkMode: (darkMode) => set({ darkMode }),
      toggleMapFilter: (filterId) =>
        set((state) => ({
          mapFilters: state.mapFilters.map((filter) =>
            filter.id === filterId ? { ...filter, isActive: !filter.isActive } : filter
          ),
        })),
      addPoints: (points) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                gamification: {
                  ...state.user.gamification,
                  points: state.user.gamification.points + points,
                  level: Math.floor((state.user.gamification.points + points) / 100) + 1,
                },
              }
            : null,
        })),
      addBadge: (badge) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                gamification: {
                  ...state.user.gamification,
                  badges: [...state.user.gamification.badges, badge],
                },
              }
            : null,
        })),
      updateEcoAction: (action, value) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                gamification: {
                  ...state.user.gamification,
                  ecoActions: {
                    ...state.user.gamification.ecoActions,
                    [action]: state.user.gamification.ecoActions[action] + value,
                  },
                },
              }
            : null,
        })),
      toggleEventBookmark: (eventId) =>
        set((state) => {
          // Implementation would update the event's bookmark status in a real app
          return state;
        }),
      updateRSVP: (eventId, status) =>
        set((state) => {
          // Implementation would update the event's RSVP status in a real app
          return state;
        }),
    }),
    {
      name: 'smart-city-storage',
    }
  )
);