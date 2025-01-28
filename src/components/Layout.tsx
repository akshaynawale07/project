import React from 'react';
import { useAppStore } from '../store';
import { Menu, Bell, Sun, Moon, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { darkMode, setDarkMode, user } = useAppStore();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <nav className={`fixed top-0 w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-gray-500" />
              <span className={`ml-4 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                SmartCity Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {darkMode ? <Sun className="h-5 w-5 text-gray-300" /> : <Moon className="h-5 w-5 text-gray-500" />}
              </button>
              <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <Bell className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
              </button>
              <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <LogOut className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}