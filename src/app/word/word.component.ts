import { Component, Input, HostListener } from '@angular/core';

import { Word, Letter } from '../word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
})
export class WordComponent {
  @Input() word!: Word;

}
