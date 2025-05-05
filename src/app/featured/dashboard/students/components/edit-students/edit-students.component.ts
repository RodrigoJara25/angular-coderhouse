import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../interfaces/Student';

@Component({
  selector: 'app-edit-students',
  standalone: false,
  templateUrl: './edit-students.component.html',
  styleUrl: './edit-students.component.scss'
})
export class EditStudentsComponent {
  constructor(
    public dialogRef: MatDialogRef<EditStudentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
