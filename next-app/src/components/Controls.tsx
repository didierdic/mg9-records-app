import React from 'react';
import { MUSIC_KEYS } from '../constants';

// Define genres and decades
const GENRES = ['Rock', 'Folk', 'Pop', 'Soundtrack', 'R&B, Funk & Soul', 'Country', 'Jazz', 'Experimental', 'Religious Music', 'Reggae & Ska', 'Hip Hop', 'Electronic', 'Comedy', 'Metal', 'Blues', 'World Music', 'Disco', 'Classical', 'New Age', 'Darkwave'];
const DECADES = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];


interface ControlsProps {
  genre: string;
  setGenre: (genre: string) => void;
  decade: number;
  setDecade: (decade: number) => void;
  musicKey: string;
  setMusicKey: (key: string) => void;
  numChords: number;
  setNumChords: (num: number) => void;
  bpm: number;
  setBpm: (bpm: number) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  genre,
  setGenre,
  decade,
  setDecade,
  musicKey,
  setMusicKey,
  numChords,
  setNumChords,
  bpm,
  setBpm,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-2">
            1. Choose Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full bg-gray-900/50 border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="decade" className="block text-sm font-medium text-gray-300 mb-2">
            2. Choose Decade
          </label>
          <select
            id="decade"
            value={decade}
            onChange={(e) => setDecade(Number(e.target.value))}
            className="w-full bg-gray-900/50 border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            {DECADES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="musicKey" className="block text-sm font-medium text-gray-300 mb-2">
            3. Choose a Key
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
          <label htmlFor="numChords" className="block text-sm font-medium text-gray-300 mb-2">
            4. Number of Chords
          </label>
          <input
            id="numChords"
            type="number"
            min="4"
            max="16"
            value={numChords}
            onChange={(e) => setNumChords(Number(e.target.value))}
            className="w-full bg-gray-900/50 border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <div>
          <label htmlFor="bpm" className="block text-sm font-medium text-gray-300 mb-2">
             5. Set Tempo (BPM: {bpm})
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
