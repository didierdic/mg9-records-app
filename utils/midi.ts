import type { Progression } from '../types';
import { chordToNotes } from './music';
import MidiWriter from 'midi-writer-js';

/**
 * Génère un data URI de fichier MIDI à partir d'une progression d'accords.
 * @param progression Le tableau d'objets d'accords.
 * @returns Un data URI encodé en base64 pour le fichier .mid.
 */
export function generateMidiDataUri(progression: Progression): string {
    try {
        const track = new MidiWriter.Track();

        // Définit l'instrument sur Piano à queue acoustique (program change 1)
        track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));

        progression.forEach(chord => {
            // Utilisation de l'octave 4 comme défaut raisonnable pour les accords de piano
            const notes = chordToNotes(chord.chord_name, 4);
            if (notes && notes.length > 0) {
                // Ajoute un nouvel événement de note à la piste.
                // '1' représente une durée de note ronde.
                const noteEvent = new MidiWriter.NoteEvent({ pitch: notes, duration: '1' });
                track.addEvent(noteEvent);
            }
        });

        const writer = new MidiWriter.Writer([track]);
        return writer.dataUri();
    } catch (error) {
        console.error('Failed to generate MIDI file:', error);
        throw new Error('MIDI library failed to process the chords. This might be due to an invalid chord format.');
    }
}
