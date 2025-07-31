'use client';
import React, { createContext, useState, useRef, useCallback, ReactNode } from 'react';
import type { Progression } from '../types';
import { chordToNotes, playChord, stopAllSounds } from '../utils/music';

interface PlaybackContextType {
  activeNotes: string[];
  isPlaying: boolean;
  activeChordIndex: number | null;
  playSingleChord: (chordName: string, duration?: number) => void;
  playProgression: (progression: Progression, bpm: number) => void;
}

export const PlaybackContext = createContext<PlaybackContextType>({
  activeNotes: [],
  isPlaying: false,
  activeChordIndex: null,
  playSingleChord: () => {},
  playProgression: () => {},
});

interface PlaybackProviderProps {
  children: ReactNode;
}

export const PlaybackProvider: React.FC<PlaybackProviderProps> = ({ children }) => {
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChordIndex, setActiveChordIndex] = useState<number | null>(null);
  
  const activePlaybackId = useRef<number | null>(null);

  const stopCurrentPlayback = useCallback(() => {
    stopAllSounds();
    setIsPlaying(false);
    setActiveNotes([]);
    setActiveChordIndex(null);
    if (activePlaybackId.current) {
        activePlaybackId.current = null;
    }
  }, []);

  const playSingleChord = useCallback((chordName: string, duration: number = 1.5) => {
    stopCurrentPlayback();
    const playbackId = Date.now();
    activePlaybackId.current = playbackId;
    setActiveChordIndex(null); // Not part of a progression

    const notes = chordToNotes(chordName);
    setActiveNotes(notes);
    playChord(chordName, duration);

    setTimeout(() => {
      if (activePlaybackId.current === playbackId) {
        setActiveNotes([]);
        activePlaybackId.current = null;
      }
    }, duration * 1000);
  }, [stopCurrentPlayback]);
  
  const playProgression = useCallback(async (progression: Progression, bpm: number) => {
    stopCurrentPlayback();
    // Laisser le temps aux mises à jour de l'UI de se faire
    await new Promise(resolve => setTimeout(resolve, 50));

    const playbackId = Date.now();
    activePlaybackId.current = playbackId;
    setIsPlaying(true);

    const beatsPerChord = 2;
    const secondsPerBeat = 60 / bpm;
    const noteDuration = secondsPerBeat * beatsPerChord;

    for (let i = 0; i < progression.length; i++) {
      if (activePlaybackId.current !== playbackId) break;
      
      const chord = progression[i];
      const notes = chordToNotes(chord.chord_name);
      
      setActiveChordIndex(i);
      setActiveNotes(notes);
      playChord(chord.chord_name, noteDuration);
      
      await new Promise(resolve => setTimeout(resolve, noteDuration * 1000));
    }
    
    if (activePlaybackId.current === playbackId) {
      stopCurrentPlayback();
    }

  }, [stopCurrentPlayback]);

  const value = {
    activeNotes,
    isPlaying,
    activeChordIndex,
    playSingleChord,
    playProgression,
  };

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
};
