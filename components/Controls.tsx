import React from 'react';
import { MUSIC_KEYS, COMPLEXITY_LEVELS } from '../constants';

interface ControlsProps {
  mood: string;
  setMood: (mood: string) => void;
  musicKey: string;
  setMusicKey: (key: string) => void;
  complexity: string;
  setComplexity: (complexity: string) => void;
  bpm: number;
  setBpm: (bpm: number) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  mood,
  setMood,
  musicKey,
  setMusicKey,
  complexity,
  setComplexity,
  bpm,
  setBpm,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
          <label htmlFor="mood" className="block text-sm font-medium text-gray-300 mb-2">
            1. Describe the Mood
          </label>
          <textarea
            id="mood"
            rows={3}
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full bg-gray-900/50 border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="e.g., 'sad and rainy', 'epic fantasy battle', 'chill lo-fi study session'"
          />
        </div>
        <div>
          <label htmlFor="musicKey" className="block text-sm font-medium text-gray-300 mb-2">
            2. Choose a Key
          </label>
          <select
            id="musicKey"
            value={musicKey}
            onChange={(e) => setMusicKey(e.target.value)}
            className="w-full bg-gray-900/50 border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            {MUSIC_KEYS.map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="complexity" className="block text-sm font-medium text-gray-300 mb-2">
            3. Select Complexity
          </label>
          <select
            id="complexity"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="w-full bg-gray-900/50 border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            {COMPLEXITY_LEVELS.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bpm" className="block text-sm font-medium text-gray-300 mb-2">
             4. Set Tempo (BPM: {bpm})
          </label>
          <input
            id="bpm"
            type="range"
            min="60"
            max="180"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
        <div className="md:col-span-3 flex justify-center mt-4">
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className="w-full md:w-auto inline-flex items-center justify-center px-12 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
          >
            {isLoading ? 'Generating...' : 'Generate Chords'}
          </button>
        </div>
      </div>
    </div>
  );
};
