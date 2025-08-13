import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = '';
  game: Game | undefined;

  constructor(public dialog: MatDialog) { }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    })
  }
}
