let audioContext: AudioContext | null = null;
const getAudioContext = (): AudioContext | null => {
  if (typeof window !== 'undefined' && !audioContext) {
    try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch(e) {
        console.error("Web Audio API is not supported in this browser.", e);
        return null;
    }
  }
  return audioContext;
};

// --- Constantes de théorie musicale ---
const NOTES_MAP: { [key: string]: string } = {
  'C': 'C', 'B#': 'C', 'C##': 'D',
  'Db': 'C#', 'C#': 'C#',
  'D': 'D',
  'Eb': 'D#', 'D#': 'D#',
  'E': 'E', 'Fb': 'E',
  'F': 'F', 'E#': 'F',
  'Gb': 'F#', 'F#': 'F#',
  'G': 'G',
  'Ab': 'G#', 'G#': 'G#',
  'A': 'A',
  'Bb': 'A#', 'A#': 'A#',
  'B': 'B', 'Cb': 'B',
};

const NOTE_VALUES: { [key: string]: number } = {
  'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11
};

const INTERVALS = {
  'm3': 3, 'M3': 4, 'P5': 7, 'd5': 6, 'A5': 8,
  'm7': 10, 'M7': 11, 'd7': 9,
  'm9': 13, 'M9': 14,
  'P11': 17, 'A11': 18,
  'm13': 20, 'M13': 21,
};

/**
 * Analyse une chaîne de nom d'accord et retourne un tableau de ses noms de notes constitutifs.
 * @param chordName Le nom de l'accord (ex: "Am7", "G7b9").
 * @param octave L'octave de base pour la note fondamentale.
 * @returns Un tableau de noms de notes (ex: ["A4", "C5", "E5", "G5"]).
 */
export function chordToNotes(chordName: string, octave: number = 4): string[] {
    const rootMatch = chordName.match(/^([A-G][#b]?)/);
    if (!rootMatch) return [];

    const rootStr = rootMatch[1];
    const qualityStr = chordName.substring(rootStr.length);
    const canonicalRoot = NOTES_MAP[rootStr];
    if (canonicalRoot === undefined) return [];
    
    const rootValue = NOTE_VALUES[canonicalRoot];
    const notes = new Set<number>();
    notes.add(rootValue);

    let third = INTERVALS.M3;
    if (qualityStr.includes('m') && !qualityStr.includes('maj')) {
        third = INTERVALS.m3;
    } else if (qualityStr.includes('dim') || qualityStr.includes('°')) {
        third = INTERVALS.m3;
    }
    notes.add(rootValue + third);

    let fifth = INTERVALS.P5;
    if (qualityStr.includes('dim') || qualityStr.includes('°') || qualityStr.includes('b5')) {
        fifth = INTERVALS.d5;
    } else if (qualityStr.includes('aug') || qualityStr.includes('+') || qualityStr.includes('#5')) {
        fifth = INTERVALS.A5;
    }
    notes.add(rootValue + fifth);

    if (qualityStr.includes('maj7') || qualityStr.includes('Δ')) {
        notes.add(rootValue + INTERVALS.M7);
    } else if (qualityStr.includes('7')) {
         if (qualityStr.includes('dim7') || qualityStr.includes('°7')) {
            notes.add(rootValue + INTERVALS.d7);
        } else {
            notes.add(rootValue + INTERVALS.m7);
        }
    }

    if (qualityStr.includes('9')) {
        notes.add(rootValue + (qualityStr.includes('b9') ? INTERVALS.m9 : INTERVALS.M9));
    }
    if (qualityStr.includes('11')) {
        notes.add(rootValue + (qualityStr.includes('#11') ? INTERVALS.A11 : INTERVALS.P11));
    }
    if (qualityStr.includes('13')) {
        notes.add(rootValue + (qualityStr.includes('b13') ? INTERVALS.m13 : INTERVALS.M13));
    }

    const noteNames = Array.from(notes).map(noteValue => {
        const noteIndex = noteValue % 12;
        const noteOctave = octave + Math.floor(noteValue / 12);
        const noteName = Object.keys(NOTE_VALUES).find(key => NOTE_VALUES[key] === noteIndex);
        return `${noteName}${noteOctave}`;
    });

    return noteNames;
}

/**
 * Convertit un nom de note (ex: "A4") en sa fréquence correspondante en Hz.
 * @param note Le nom de la note.
 * @returns La fréquence en Hz.
 */
function noteToFrequency(note: string): number {
    const noteMatch = note.match(/^([A-G][#b]?)([0-9])$/);
    if (!noteMatch) return 0;
    
    const key = noteMatch[1];
    const octave = parseInt(noteMatch[2], 10);
    const canonicalKey = NOTES_MAP[key];
    if (!canonicalKey) return 0;

    const keyNumber = NOTE_VALUES[canonicalKey];
    const midiNumber = keyNumber + (octave + 1) * 12;

    return 440 * Math.pow(2, (midiNumber - 69) / 12);
}

// --- Contrôle de la lecture ---
let activeNodes: (AudioNode)[] = [];

/**
 * Arrête tout son en cours de lecture ou programmé.
 */
export function stopAllSounds() {
    activeNodes.forEach(node => {
        if(node instanceof OscillatorNode) {
            try { node.stop(0); } catch(e) {}
        }
        node.disconnect();
    });
    activeNodes = [];
}

/**
 * Joue un seul accord pour une durée spécifiée.
 * @param chordName Le nom de l'accord à jouer.
 * @param duration La durée en secondes.
 */
export function playChord(chordName: string, duration: number = 1.5) {
    stopAllSounds();

    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    const notes = chordToNotes(chordName);
    if (notes.length === 0) {
        console.warn(`Could not parse chord: ${chordName}`);
        return;
    }

    const now = ctx.currentTime;
    const attackTime = 0.02;
    const releaseTime = duration - attackTime;
    
    notes.forEach(note => {
        const freq = noteToFrequency(note);
        if (freq === 0) return;
        
        const gainNode = ctx.createGain();
        gainNode.connect(ctx.destination);
        gainNode.gain.setValueAtTime(0, now);
        // Attaque courte et nette
        gainNode.gain.linearRampToValueAtTime(0.4 / notes.length, now + attackTime);
        // Décroissance exponentielle pour un son plus naturel et percussif
        gainNode.gain.setTargetAtTime(0, now + attackTime, releaseTime / 2.0);

        // Oscillateur principal (son plus propre)
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + duration);

        // Oscillateur d'harmoniques (ajoute de la brillance et des harmoniques)
        const overtone = ctx.createOscillator();
        overtone.type = 'triangle';
        overtone.frequency.setValueAtTime(freq * 2, now); // Une octave plus haut
        const overtoneGain = ctx.createGain();
        overtoneGain.gain.value = 0.2; // Moins fort que l'oscillateur principal
        overtone.connect(overtoneGain).connect(gainNode);
        overtone.start(now);
        overtone.stop(now + duration);

        activeNodes.push(osc, overtone, gainNode, overtoneGain);
    });

    setTimeout(() => {
        activeNodes = [];
    }, duration * 1000 + 100);
}
