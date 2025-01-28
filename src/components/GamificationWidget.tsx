import React from 'react';
import { useAppStore } from '../store';
import { Trophy, Award, Bike, Recycle, Zap } from 'lucide-react';

export function GamificationWidget() {
  const { user } = useAppStore();

  if (!user) return null;

  const { points, level, badges, ecoActions } = user.gamification;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold dark:text-white">Eco Impact</h2>
        <div className="flex items-center">
          <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-lg font-bold dark:text-white">{points} pts</span>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">Level {level}</span>
          <span className="text-gray-600 dark:text-gray-400">
            {points % 100}/100 to next level
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-500 rounded-full h-2 transition-all"
            style={{ width: `${points % 100}%` }}
          />
        </div>
      </div>

      {/* Badges */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 dark:text-white">Recent Badges</h3>
        <div className="flex space-x-2">
          {badges.slice(-3).map((badge, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900"
            >
              <Award className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Eco Actions */}
      <div>
        <h3 className="text-sm font-semibold mb-3 dark:text-white">Your Impact</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bike className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm dark:text-white">Public Transport</span>
            </div>
            <span className="text-sm font-medium dark:text-white">
              {ecoActions.publicTransport} trips
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Recycle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm dark:text-white">Recycling</span>
            </div>
            <span className="text-sm font-medium dark:text-white">
              {ecoActions.recycling} items
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm dark:text-white">Energy Saved</span>
            </div>
            <span className="text-sm font-medium dark:text-white">
              {ecoActions.energySaving} kWh
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}