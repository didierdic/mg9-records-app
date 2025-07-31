import React, { useState, useEffect, useContext } from 'react';
import type { Progression } from '../types';
import { ChordCard } from './ChordCard';
import { stopAllSounds } from '../utils/music';
import { generateMidiDataUri } from '../utils/midi';
import { Piano } from './Piano';
import { PlaybackContext } from '../contexts/PlaybackContext';
import { DownloadIcon, PlayAllIcon, RegenerateIcon, CopyIcon } from './icons';

interface ProgressionDisplayProps {
  progression: Progression;
  bpm: number;
  onSelectChord: (index: number) => void;
  onRegenerate: () => void;
}

export const ProgressionDisplay: React.FC<ProgressionDisplayProps> = ({ progression, bpm, onSelectChord, onRegenerate }) => {
  const [midiError, setMidiError] = useState<string | null>(null);
  const [copyText, setCopyText] = useState('Copy Progression');
  const { isPlaying, playProgression, activeNotes, activeChordIndex } = useContext(PlaybackContext);

  const handlePlayAll = () => {
    playProgression(progression, bpm);
  };

  const handleCopyProgression = () => {
    const progressionString = progression.map(c => c.chord_name).join(' - ');
    navigator.clipboard.writeText(progressionString);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy Progression'), 2000);
  };

  const handleDownloadMidi = () => {
    setMidiError(null);
    try {
        const midiDataUri = generateMidiDataUri(progression);
        const link = document.createElement('a');
        link.href = midiDataUri;
        link.download = 'ai-chord-progression.mid';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        if (error instanceof Error) {
            setMidiError(error.message);
        } else {
            setMidiError('An unknown error occurred while creating the MIDI file.');
        }
    }
  };
  
  useEffect(() => {
    return () => {
        stopAllSounds();
    }
  }, []);

  const buttonBaseClasses = "flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="mt-10">
       <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 mb-6">
         <h2 className="text-2xl font-bold text-gray-300 w-full text-center sm:w-auto sm:text-left sm:mr-4">Generated Progression</h2>
         <button
            onClick={handlePlayAll}
            disabled={isPlaying}
            className={`${buttonBaseClasses} bg-green-600 hover:bg-green-700 focus:ring-green-500`}
            aria-label="Play entire chord progression"
         >
            <PlayAllIcon className="h-5 w-5" />
            {isPlaying ? 'Playing...' : 'Play All'}
         </button>
         <button
            onClick={onRegenerate}
            disabled={isPlaying}
            className={`${buttonBaseClasses} bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500`}
            aria-label="Regenerate chord progression with same settings"
         >
            <RegenerateIcon className="h-5 w-5" />
            Regenerate
         </button>
         <button
            onClick={handleCopyProgression}
            className={`${buttonBaseClasses} bg-gray-600 hover:bg-gray-700 focus:ring-gray-500`}
            aria-label="Copy chord progression to clipboard"
         >
            <CopyIcon className="h-5 w-5" />
            {copyText}
         </button>
         <button
            onClick={handleDownloadMidi}
            className={`${buttonBaseClasses} bg-teal-600 hover:bg-teal-700 focus:ring-teal-500`}
            aria-label="Download chord progression as MIDI file"
         >
            <DownloadIcon className="h-5 w-5" />
            Download MIDI
         </button>
       </div>
        {midiError && (
          <div className="text-center my-2 text-red-400 bg-red-900/50 p-3 rounded-md">
            <p><strong>Could not generate MIDI:</strong> {midiError}</p>
          </div>
       )}
      <div className="mb-8">
        <Piano activeNotes={activeNotes} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {progression.map((chord, index) => (
          <ChordCard 
            key={`${chord.chord_name}-${index}`} 
            chord={chord}
            onCardClick={() => onSelectChord(index)}
            isActive={isPlaying && activeChordIndex === index}
          />
        ))}
      </div>
    </div>
  );
};
