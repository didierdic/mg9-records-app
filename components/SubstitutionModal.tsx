import React, { useState, useCallback, useEffect, useContext } from 'react';
import type { Chord, ChordSubstitution, Progression } from '../types';
import { generateChordSubstitutions } from '../services/musicService';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';
import { PlaybackContext } from '../contexts/PlaybackContext';
import { PlayIcon } from './icons';

interface SubstitutionModalProps {
    isOpen: boolean;
    onClose: () => void;
    chord: Chord;
    chordIndex: number;
    progression: Progression;
    musicKey: string;
    onSubstitute: (newChord: Chord) => void;
}

const SuggestionCard: React.FC<{ suggestion: ChordSubstitution; onSelect: () => void; }> = ({ suggestion, onSelect }) => {
    const { playSingleChord } = useContext(PlaybackContext);

    const handlePlayPreview = (e: React.MouseEvent) => {
        e.stopPropagation();
        playSingleChord(suggestion.chord_name);
    };

    return (
        <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 transition-all hover:border-teal-500/80 hover:bg-gray-700">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-4">
                     <button 
                        onClick={handlePlayPreview} 
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600/50 text-white flex items-center justify-center transition-all transform hover:scale-110 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-gray-800"
                        aria-label={`Play preview of ${suggestion.chord_name}`}
                        >
                        <PlayIcon className="w-5 h-5" />
                    </button>
                    <div>
                        <p className="text-2xl font-bold text-teal-400">{suggestion.chord_name}</p>
                        <p className="text-lg text-gray-400 -mt-1">{suggestion.roman_numeral}</p>
                    </div>
                </div>
                <button
                    onClick={onSelect}
                    className="px-4 py-1.5 text-sm font-semibold text-white bg-teal-600 rounded-full hover:bg-teal-500 transition-colors flex-shrink-0"
                >
                    Use Chord
                </button>
            </div>
            <p className="mt-3 text-sm text-gray-300">
                <span className="font-semibold">Voicing:</span> {suggestion.voicing_suggestion}
            </p>
            <p className="mt-2 text-sm text-gray-300 bg-gray-800/50 p-3 rounded-md">
                <span className="font-semibold text-teal-400">Harmonic Idea:</span> {suggestion.explanation}
            </p>
        </div>
    );
}


export const SubstitutionModal: React.FC<SubstitutionModalProps> = ({
    isOpen,
    onClose,
    chord,
    progression,
    musicKey,
    onSubstitute,
    chordIndex
}) => {
    const [suggestions, setSuggestions] = useState<ChordSubstitution[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSuggestions = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setSuggestions([]);
        try {
            const result = await generateChordSubstitutions(chord, progression, musicKey);
            setSuggestions(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [chord, progression, musicKey]);

    // Réinitialiser l'état lorsque la modale s'ouvre pour un nouvel accord
    useEffect(() => {
        if (isOpen) {
            setSuggestions([]);
            setError(null);
            setIsLoading(false);
        }
    }, [isOpen, chordIndex]);

    // Gérer la touche Échap pour fermer la modale
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="substitution-modal-title"
        >
            <div 
                className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-5 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
                    <h2 id="substitution-modal-title" className="text-xl font-bold text-gray-200">
                        Replace <span className="text-indigo-400">{chord.chord_name}</span>
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <div className="p-6 overflow-y-auto">
                    {!suggestions.length && !isLoading && !error && (
                        <div className="text-center">
                            <p className="text-gray-400 mb-6">Let AI suggest some creative harmonic substitutions for this chord.</p>
                            <button
                                onClick={fetchSuggestions}
                                className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 transition-transform transform hover:scale-105"
                            >
                                ✨ Suggest Substitutions
                            </button>
                        </div>
                    )}
                    
                    {isLoading && <Loader />}
                    {error && <ErrorMessage message={error} />}

                    {suggestions.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-300">Suggestions:</h3>
                            {suggestions.map((s, i) => (
                                <SuggestionCard key={i} suggestion={s} onSelect={() => onSubstitute(s)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
