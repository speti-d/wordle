import { Component, Input, HostListener } from '@angular/core';

import { Word, Letter } from '../word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
})
export class WordComponent {

  readonly inWord = {
    unchecked: 'unchecked',
    correct: 'correct',
    in_word: 'in_word',
    not_in_word: 'not_in_word',
  }

  wordActual: string = "teszt".toLocaleUpperCase();
  word: Word = {letters: []};

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.word.letters.length === 5)
      {
        this.compareWords();
      }
    }
    if (this.isAlpha(event.key)) {
      this.addLetter(event.key);
    };
  }

  @HostListener('document:keydown', ['$event'])
  handleBackspaceEvent(event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      this.removeLetter();
    };
    if (event.key === 'Backspace' && event.ctrlKey ) {
      this.clearLetters();
    };
  }

  compareWords(): void {
    this.word.letters.forEach((letter, index) => {
      // Check if letter is in actual word
      if (this.wordActual.includes(letter.letter)) {
        //Check if letter is in the correct spot
        letter.letter === this.wordActual[index] ? 
        letter.correct = this.inWord.correct : 
        letter.correct = this.inWord.in_word
      } else {
        letter.correct = this.inWord.not_in_word;
      };
    });
  }

  addLetter(newLetter: string): void {
    this.word.letters.push({letter: newLetter.toUpperCase()})
    this.word.letters = this.word.letters.slice(0,5);
  }

  removeLetter() {
    this.word.letters.pop()
  }
  
  clearLetters() {
    this.word.letters = []
  }

  isAlpha(character: string): boolean {
    return /^[a-zA-Z]$/.test(character)
  }
}
