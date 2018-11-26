import { User } from './../../classes/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, EventEmitter, Input, Output, Inject } from '@angular/core';
import { Project } from '../../classes/projects';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog-create-project',
  templateUrl: './dialog-create-project.component.html',
  styleUrls: ['./dialog-create-project.component.scss']
})
export class DialogCreateProjectComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  // @Input('newProject') public _project: Project;

  public _project = {
    id: Math.floor(Math.random() * 1000),
    name: null,
    leader: null,
    members: [],
    tasks: [],
    deadline: null
  };

  constructor(private dialogRef: MatDialogRef<DialogCreateProjectComponent>) { }

  ngOnInit() {
  }
}
