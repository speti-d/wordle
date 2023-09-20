export interface Letter {
    letter: string;
    correct?: string;
}

export interface Word {
    letters: Letter[];
}