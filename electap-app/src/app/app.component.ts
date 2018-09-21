import { Component, OnInit } from '@angular/core';
import { Game } from './objects/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'electap-app';
  private _game: Game;

  ngOnInit(): void {
    this._game = new Game();
  }
}
