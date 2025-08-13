import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { MatDialogActions } from "@angular/material/dialog/index";

@Component({
  selector: 'app-dialog-add-player',
  imports: [MatDialogContent, CommonModule, MatFormFieldModule, MatInputModule, MatDialogActions],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
 name: string = '';

 
}
