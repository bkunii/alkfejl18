import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Task } from 'src/app/classes/task';
import { Project } from 'src/app/classes/projects';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: [
    '../common-dialog-styles.scss',
    './dialog-add-task.component.css'
  ]
})
export class DialogAddTaskComponent implements OnInit {

  private projectTasks: Task[];
  private _task: Task;

  constructor(
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) { }

  ngOnInit() {
    this._task = new Task();
    this._task = {
      id: Math.floor(Math.random() * 999999),
      name: '',
      assignees: [],
      prerequisites: [],
      project: null,
      requiredSkills: [],
      startTime: null,
      endTime: null,
      requiredBy: null,
      complete: false,
      completedBy: null
    };
    this._task.project = this.data.id;
    this.projectService.getTasksOfProject(this.data.id).subscribe(tasks => this.projectTasks = tasks);
  }
}
