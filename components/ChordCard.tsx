import React, { useContext } from 'react';
import type { Chord } from '../types';
import { PlaybackContext } from '../contexts/PlaybackContext';
import { MusicIcon, InfoIcon, PlayIcon, SwapIcon } from './icons';

interface ChordCardProps {
  chord: Chord;
  onCardClick: () => void;
  isActive?: boolean;
}

export const ChordCard: React.FC<ChordCardProps> = ({ chord, onCardClick, isActive = false }) => {
  const { playSingleChord } = useContext(PlaybackContext);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSingleChord(chord.chord_name, 1.5);
  };
  
  const activeClasses = 'border-teal-400 shadow-teal-500/20 scale-105';
  const inactiveClasses = 'border-gray-700 group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/10 group-hover:-translate-y-1';

  return (
    <div 
      onClick={onCardClick}
      className={`group bg-gray-800/60 backdrop-blur-md border rounded-lg shadow-lg p-5 flex flex-col justify-between h-full transition-all duration-300 cursor-pointer ${isActive ? activeClasses : inactiveClasses}`}
      title="Click to substitute this chord"
    >
      <div>
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold text-indigo-400">{chord.chord_name}</p>
          <div className={`transition-colors ${isActive ? 'text-teal-400' : 'text-gray-500 group-hover:text-indigo-400'}`}>
            <SwapIcon className="w-7 h-7" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-gray-400 bg-gray-700/50 px-3 py-1 rounded-md inline-block mt-1">{chord.roman_numeral}</p>
        <div className="mt-4 border-b border-gray-700 pb-3">
          <div className="flex items-center text-gray-400">
            <MusicIcon className="w-5 h-5 mr-2 text-indigo-500" />
            <span className="font-semibold text-gray-300 mr-2">Function:</span>
            <span>{chord.function}</span>
          </div>
        </div>
         <div className="mt-3 flex items-start text-gray-400 flex-1 pr-2">
            <InfoIcon className="w-5 h-5 mr-2 mt-0.5 text-indigo-500 flex-shrink-0" />
            <div>
              <span className="font-semibold text-gray-300 mr-2">Voicing:</span>
              <span>{chord.voicing_suggestion}</span>
            </div>
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
