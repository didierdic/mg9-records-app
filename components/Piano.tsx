import React from 'react';

const OCTAVES = [3, 4, 5];
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const notes = OCTAVES.flatMap(octave => 
  NOTE_NAMES.map(noteName => `${noteName}${octave}`)
);

const isBlackKey = (note: string) => note.includes('#');
const getNoteNameWithoutOctave = (note: string) => note.slice(0, -1);

interface PianoKeyProps {
  note: string;
  isBlack: boolean;
  isActive: boolean;
}

const PianoKey: React.FC<PianoKeyProps> = ({ note, isBlack, isActive }) => {
  const baseClasses = 'relative border-gray-600 transition-colors duration-100';
  const activeClasses = 'bg-indigo-500 border-indigo-400';
  
  if (isBlack) {
    return (
      <div 
        className={`${baseClasses} w-[60%] h-2/3 z-10 mx-[20%] border-b border-x rounded-b-md ${isActive ? activeClasses : 'bg-gray-800'}`}
        data-note={note}
      />
    );
  } else {
    return (
      <div 
        className={`${baseClasses} flex-1 border rounded-md flex justify-center items-end pb-2 ${isActive ? activeClasses : 'bg-gray-200'}`}
        data-note={note}
      >
        <span className={`text-xs ${isActive ? 'text-white' : 'text-gray-500'}`}>{getNoteNameWithoutOctave(note)}</span>
      </div>
    );
  }
};

interface PianoProps {
  activeNotes: string[];
}

export const Piano: React.FC<PianoProps> = ({ activeNotes }) => {
  const whiteKeys = notes.filter(note => !isBlackKey(note));

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl">
      <div className="relative" style={{ aspectRatio: '4 / 1' }}>
        {/* Touches blanches */}
        <div className="absolute inset-0 flex gap-px">
          {whiteKeys.map(note => (
            <PianoKey
              key={note}
              note={note}
              isBlack={false}
              isActive={activeNotes.includes(note)}
            />
          ))}
        </div>
        
        {/* Touches noires */}
        <div className="absolute inset-0 flex pointer-events-none">
           {notes.filter(isBlackKey).map(note => {
            const octave = parseInt(note.slice(-1));
            const noteName = getNoteNameWithoutOctave(note);
            const whiteKeyIndex = whiteKeys.findIndex(wk => wk.startsWith(noteName[0]) && wk.endsWith(octave.toString()));
            const whiteKeyWidth = 100 / whiteKeys.length;
            const leftPosition = (whiteKeyIndex * whiteKeyWidth) + (whiteKeyWidth * 0.65);

            return (
              <div
                key={note}
                className="absolute top-0 h-2/3 pointer-events-auto"
                style={{ left: `${leftPosition}%`, width: `${whiteKeyWidth * 0.7}%` }}
              >
                <PianoKey
                  note={note}
                  isBlack={true}
                  isActive={activeNotes.includes(note)}
                />
              </div>
            )
           })}
        </div>
      </div>
    </div>
  );
};
