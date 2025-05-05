import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'shared-dialog',
  standalone: false,
  template: `
    <h2 mat-dialog-title>{{data.title}}</h2>
    <mat-dialog-content>
      <p>{{ data.content }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button (click)="submit()">Confirm</button>
    </mat-dialog-actions>
  `
})
export class DialogComponent {  // Este es un componente reutilizable
  constructor(
    private matDialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string }
  ) {}

  submit() {
    this.matDialogRef.close(true);
  }
}
