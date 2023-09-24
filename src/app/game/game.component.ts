import { Component, HostListener } from '@angular/core';

import { Word, Letter } from '../word';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  words: Word[];
  index: number = 0;
  wordActual: string = "teszt".toUpperCase();
  game_over: boolean = false;

  readonly inWord = {
    unchecked: 'unchecked',
    correct: 'correct',
    in_word: 'in_word',
    not_in_word: 'not_in_word',
  }

  constructor() {
    this.words = [
      {letters: []},
      {letters: []},
      {letters: []},
      {letters: []},
      {letters: []},
      {letters: []},
    ];
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.game_over) {
      if ( this.words[this.index].letters.length === 5 )
      {
        this.compareWords();
        this.index += 1;
      }
    }
    if (this.isAlpha(event.key)  && !this.game_over) {
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

    isAlpha(character: string): boolean {
    return /^[a-zA-Z]$/.test(character)
  }

  checkGameEnd(word_is_correct: boolean): void {
    if (word_is_correct && !this.game_over) {
      this.game_over = true;
      alert('You win')
    }
    else if (this.index >= 5 && !this.game_over) {
      this.game_over = true;
      alert(`You Lost :,( solution: ${this.wordActual}`)
    }
  }

  compareWords(): void {

    let word_is_correct: boolean = true;

    this.words[this.index].letters.forEach((letter, index) => {
      // Check if letter is in actual word
      if (this.wordActual.includes(letter.letter)) {
        //Check if letter is in the correct spot
        if (letter.letter === this.wordActual[index]) {
          letter.correct = this.inWord.correct 
        } else {
          letter.correct = this.inWord.in_word
          word_is_correct = false;
        }
      } else {
        letter.correct = this.inWord.not_in_word;
        word_is_correct = false;
      };
      this.checkGameEnd(word_is_correct);
    });
  }

  addLetter(newLetter: string): void {
    this.words[this.index].letters.push({letter: newLetter.toUpperCase()})
    this.words[this.index].letters = this.words[this.index].letters.slice(0,5);
  }

  removeLetter() {
    this.words[this.index].letters.pop()
  }
  
  clearLetters() {
    this.words[this.index].letters = []
  }

}
