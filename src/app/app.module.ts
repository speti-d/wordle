import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WordComponent } from './word/word.component';
import { LetterComponent } from './letter/letter.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    WordComponent,
    LetterComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
