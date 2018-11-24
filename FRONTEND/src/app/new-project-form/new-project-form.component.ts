import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-project-form',
  templateUrl: './new-project-form.component.html',
  styleUrls: ['./new-project-form.component.scss']
})
export class NewProjectFormComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NewProjectFormComponent>) { }

  ngOnInit() {
  }

  private onSaveClick(): void {
    this.dialogRef.close();
  }

  private onCancelClick(): void {
    this.dialogRef.close();
  }
}
