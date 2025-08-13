import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = '';
  game: Game | undefined;

  ngOnInit() {
    this.newGame()
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game?.stack.pop() ?? '';
      this.pickCardAnimation = true;
      console.log(this.game, this.currentCard)

      setTimeout(() => {
        this.game?.playedCards.push(this.currentCard)
        this.pickCardAnimation = false;
      }, 1000);

    }
  }
}
