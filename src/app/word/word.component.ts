import { Component, Input, HostListener } from '@angular/core';

import { Word, Letter } from '../word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent {
  @Input()wordGuess?: string;
  wordActual: string = "teszt";
  word: Word = {letters: []};

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.addLetter(event.key);
  }

  @HostListener('document:keydown', ['$event'])
  handleBackspaceEvent(event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      this.removeLetter();
    };
    if (event.key === 'Backspace' && event.ctrlKey ) {
      this.clearLetters();
    }
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

}
