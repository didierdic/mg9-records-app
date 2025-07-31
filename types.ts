export interface Chord {
  chord_name: string;
  roman_numeral: string;
  voicing_suggestion: string;
  function: string;
}

export type Progression = Chord[];

export interface ChordSubstitution extends Chord {
    explanation: string;
}
