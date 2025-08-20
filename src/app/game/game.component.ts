import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { addDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection, collectionData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent, AsyncPipe],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {


  game: Game | undefined;
  gameId: string | undefined;

  private firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params)
      docData(this.gameRef(params['id']), { idField: 'id' }).subscribe((game: any) => {
        this.game!.currentPlayer = game.currentPlayer;
        this.game!.playedCards = game.playedCards;
        this.game!.players = game.players;
        this.game!.stack = game.stack;
        this.game!.currentCard = game.currentCard;
        this.game!.pickCardAnimation = game.pickCardAnimation;
        this.gameId = params['id'];
        console.log(game)
      })
    });

  }

  gamesRef() {
    return collection(this.firestore, 'games');
  }

  gameRef(id: string) {
    return doc(this.firestore, `games/${id}`)
  }

  async newGame() {
    this.game = new Game();
  }

  saveGame() {
    if(this.gameId && this.game) updateDoc(this.gameRef(this.gameId), this.game.toJson())
  }

  takeCard() {
    if (!this.game?.pickCardAnimation) {
      this.game!.currentCard = this.game?.stack.pop() ?? '';
      this.game!.pickCardAnimation = true;
      this.game!.currentPlayer++;
      this.game!.currentPlayer = this.game!.currentPlayer % this.game!.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game?.playedCards.push(this.game.currentCard)
        this.game!.pickCardAnimation = false;
      this.saveGame();

      }, 1000);

    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game?.players.push(name);
        this.saveGame();
      }

    })
  }
}
