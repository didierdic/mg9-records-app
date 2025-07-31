import React, { useState, useCallback } from 'react';
import { Controls } from './Controls';
import { ProgressionDisplay } from './ProgressionDisplay';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';
import { Welcome } from './Welcome';
import { generateChordProgression } from '../services/musicService';
import type { Progression } from '../types';
import { MUSIC_KEYS } from '../constants';

// Define genres and decades from ChordSeqAI
const GENRES = ['Rock', 'Folk', 'Pop', 'Soundtrack', 'R&B, Funk & Soul', 'Country', 'Jazz', 'Experimental', 'Religious Music', 'Reggae & Ska', 'Hip Hop', 'Electronic', 'Comedy', 'Metal', 'Blues', 'World Music', 'Disco', 'Classical', 'New Age', 'Darkwave'];
const DECADES = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

export const ChordGeneratorPage: React.FC = () => {
    const [genre, setGenre] = useState(GENRES[0]);
    const [decade, setDecade] = useState(DECADES[5]); // Default 2000
    const [musicKey, setMusicKey] = useState(MUSIC_KEYS[0]);
    const [numChords, setNumChords] = useState(4);
    const [bpm, setBpm] = useState(120);
    
    const [progression, setProgression] = useState<Progression | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleGenerate = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      setProgression(null); 
  
      try {
        const result = await generateChordProgression(genre, decade, musicKey, numChords);
        
        if (result && result.length > 0) {
            setProgression(result);
        } else {
            setError("The AI returned an empty progression. Please try adjusting your parameters.");
        }

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    }, [genre, decade, musicKey, numChords]);
  
    return (
        <>
            <Controls 
  genre={genre}
  setGenre={setGenre}
  decade={decade}
  setDecade={setDecade}
  musicKey={musicKey}
  setMusicKey={setMusicKey}
  numChords={numChords}
  setNumChords={setNumChords}
  bpm={bpm}
  setBpm={setBpm}
  onGenerate={handleGenerate}
  isLoading={isLoading}
/>
            
            <div className="mt-8">
  {isLoading && <Loader />}
  {error && <ErrorMessage message={error} />}
  {progression && !isLoading && <ProgressionDisplay progression={progression} bpm={bpm} onRegenerate={handleGenerate} />} {/* Remove onSelectChord */}
  {!isLoading && !progression && !error && <Welcome />}
</div>

            {/* Remove SubstitutionModal as not supported */}
        </>
    );
}
