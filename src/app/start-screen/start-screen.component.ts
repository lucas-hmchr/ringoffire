import { Component, inject } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Router, RouterModule } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  imports: [RouterModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  private firestore: Firestore = inject(Firestore);

  constructor(private router: Router) { }

  async newGame() {
    let game = new Game();
    await addDoc(this.gamesRef(), game.toJson()).then((gameInfo: any) => {
      console.log(gameInfo)
    this.router.navigateByUrl('/game/' + gameInfo.id)
    })
  }

  gamesRef() {
    return collection(this.firestore, 'games');
  }
}
