import React from 'react';
import { useAppStore } from '../store';
import { Landmark, ParkingMeter as Parking, Bus, Leaf, MapPin } from 'lucide-react';

const FILTER_ICONS = {
  landmark: Landmark,
  parking: Parking,
  transport: Bus,
  eco: Leaf,
  tourist: MapPin,
};

export function MapControls() {
  const { mapFilters, toggleMapFilter } = useAppStore();

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-sm font-semibold mb-3 dark:text-white">Map Layers</h3>
      <div className="space-y-2">
        {mapFilters.map((filter) => {
          const Icon = FILTER_ICONS[filter.category];
          return (
            <button
              key={filter.id}
              onClick={() => toggleMapFilter(filter.id)}
              className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md transition-colors ${
                filter.isActive
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{filter.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}