export interface Letter {
    letter: string;
    correct?: boolean;
}

export interface Word {
    letters: Letter[];
}