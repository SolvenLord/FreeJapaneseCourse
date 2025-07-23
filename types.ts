
export interface Word {
  japanese: string;
  romaji: string;
  portuguese: string;
  english: string;
}

export interface Sentence {
  japanese: string;
  romaji: string;
  portuguese: string;
  english: string;
}

export interface Category {
  name: string;
  icon: string;
  words: Word[];
  sentences?: Sentence[];
}
