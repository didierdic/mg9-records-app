import React, { useState, useCallback } from 'react';
import { Controls } from './Controls';
import { ProgressionDisplay } from './ProgressionDisplay';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';
import { Welcome } from './Welcome';
import { generateChordProgression } from '../services/musicService';
import type { Progression, Chord } from '../types';
import { MUSIC_KEYS, COMPLEXITY_LEVELS } from '../constants';
import { SubstitutionModal } from './SubstitutionModal';

export const ChordGeneratorPage: React.FC = () => {
    const [mood, setMood] = useState('Melancholic and hopeful');
    const [musicKey, setMusicKey] = useState(MUSIC_KEYS[0]);
    const [complexity, setComplexity] = useState(COMPLEXITY_LEVELS[2]);
    const [bpm, setBpm] = useState(120);
    
    const [progression, setProgression] = useState<Progression | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const [selectedChordIndex, setSelectedChordIndex] = useState<number | null>(null);
  
    const handleGenerate = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      // Effacer les résultats précédents immédiatement pour un retour utilisateur clair.
      setProgression(null); 
  
      try {
        const result = await generateChordProgression(mood, musicKey, complexity);
        
        if (result && result.length > 0) {
            setProgression(result);
        } else {
            setError("The AI returned an empty progression. Please try adjusting your prompt.");
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
    }, [mood, musicKey, complexity]);
  
    const handleSelectChord = useCallback((index: number) => {
      setSelectedChordIndex(index);
    }, []);
  
    const handleCloseModal = useCallback(() => {
      setSelectedChordIndex(null);
    }, []);
  
    const handleUpdateChord = useCallback((index: number, newChord: Chord) => {
      if (progression) {
          const newProgression = [...progression];
          const updatedChord: Chord = {
              chord_name: newChord.chord_name,
              roman_numeral: newChord.roman_numeral,
              voicing_suggestion: newChord.voicing_suggestion,
              function: newChord.function
          };
          newProgression[index] = updatedChord;
          setProgression(newProgression);
          handleCloseModal();
      }
    }, [progression, handleCloseModal]);
  
    return (
        <>
            <Controls 
              mood={mood}
              setMood={setMood}
              musicKey={musicKey}
              setMusicKey={setMusicKey}
              complexity={complexity}
              setComplexity={setComplexity}
              bpm={bpm}
              setBpm={setBpm}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
            
            <div className="mt-8">
              {isLoading && <Loader />}
              {error && <ErrorMessage message={error} />}
              {progression && !isLoading && <ProgressionDisplay progression={progression} bpm={bpm} onSelectChord={handleSelectChord} onRegenerate={handleGenerate} />}
              {!isLoading && !progression && !error && <Welcome />}
            </div>

            {selectedChordIndex !== null && progression && (
            <SubstitutionModal
                isOpen={selectedChordIndex !== null}
                onClose={handleCloseModal}
                chord={progression[selectedChordIndex]}
                progression={progression}
                musicKey={musicKey}
                onSubstitute={(newChord) => handleUpdateChord(selectedChordIndex, newChord)}
                chordIndex={selectedChordIndex}
            />
          )}
        </>
    );
}
