import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-courses',
  standalone: false,
  templateUrl: './edit-courses.component.html',
  styleUrl: './edit-courses.component.scss'
})
export class EditCoursesComponent {
  constructor(
    public dialogRef: MatDialogRef<EditCoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
