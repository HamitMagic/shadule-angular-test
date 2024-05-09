import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { DialogData } from '../../models/dialog-data';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogActions, MatIcon, MatDialogContent, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
