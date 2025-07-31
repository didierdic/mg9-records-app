export interface Chord {
  chord_name: string;
}

export type Progression = Chord[];

// Remove ChordSubstitution as substitutions are not supported
export interface ChordSubstitution extends Chord {
    explanation: string;
}
