import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { addDoc, doc, docData, Firestore } from '@angular/fire/firestore';
import { collection, collectionData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent, AsyncPipe],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = '';
  game: Game | undefined;

  private firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params)
      docData(this.gameRef(params['id']), { idField: 'id' }).subscribe((game: any) => {
        this.game = game;
        console.log(game)
      })
      // collectionData(this.gamesRef(), { idField: 'id' }).subscribe((games) => {
      //   console.log('game update', games);
      // });
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
    // await addDoc(this.gamesRef(), this.game.toJson())
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game?.stack.pop() ?? '';
      this.pickCardAnimation = true;
      this.game!.currentPlayer++;
      this.game!.currentPlayer = this.game!.currentPlayer % this.game!.players.length;

      setTimeout(() => {
        this.game?.playedCards.push(this.currentCard)
        this.pickCardAnimation = false;
      }, 1000);

    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game?.players.push(name);
      }

    })
  }
}
