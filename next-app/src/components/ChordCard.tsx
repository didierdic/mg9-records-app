import React, { useContext } from 'react';
import type { Chord } from '../types';
import { PlaybackContext } from '../contexts/PlaybackContext';
import { PlayIcon } from './icons';

interface ChordCardProps {
  chord: Chord;
  isActive?: boolean;
}

export const ChordCard: React.FC<ChordCardProps> = ({ chord, isActive = false }) => {
  const { playSingleChord } = useContext(PlaybackContext);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSingleChord(chord.chord_name, 1.5);
  };
  
  const activeClasses = 'border-teal-400 shadow-teal-500/20 scale-105';
  const inactiveClasses = 'border-gray-700 group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/10 group-hover:-translate-y-1';

  return (
    <div 
      className={`group bg-gray-800/60 backdrop-blur-md border rounded-lg shadow-lg p-5 flex flex-col justify-between h-full transition-all duration-300 cursor-pointer ${isActive ? activeClasses : inactiveClasses}`}
    >
      <div>
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold text-indigo-400">{chord.chord_name}</p>
        </div>
      </div>
      <div className="mt-3 flex justify-end items-end">
        <button 
          onClick={handlePlay} 
          className="ml-2 flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center transition-transform transform hover:scale-110 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800"
          aria-label={`Play chord ${chord.chord_name}`}
        >
          <PlayIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
