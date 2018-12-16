import { Skill } from './../classes/skill';
import { AuthenticationService } from './../services/auth.service';
// import { User } from 'src/app/classes/user';
import { DialogAddTaskComponent } from './../dialogs/dialog-add-task/dialog-add-task.component';
import { MatDialog } from '@angular/material';
import { Task } from './../classes/task';
import { TaskService } from './../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Project } from '../classes/projects';
import { ProjectService } from '../services/project.service';
import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3';
import { UserService } from '../services/user.service';
import { dateToString } from '../globals';
import { User } from '../classes/user';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: [
    '../common-styles.scss',
    './project-tasks.component.scss'
  ]
})
export class ProjectTasksComponent implements OnInit {

  private dateToString;

  private render;
  private graph;
  private svg;

  public project: Project;
  private tasks: Task[];
  private selectedTask: Task;
  private users: User[];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.dateToString = dateToString;
    this.project = new Project('', new User('', '', ''));
  }

  async ngOnInit() {

    await this.authService.login('', ''); // Eltávolítandó
    this.svg = d3.select('svg');
    this.render = new dagreD3.render();

    this.initGraph();
  }

  private async initGraph() {

    const projectID: number = parseInt(this.route.snapshot.paramMap.get('pid'), 10);
    this.project = await this.projectService.getProject(projectID);
    if (this.project.tasks === undefined) {
      this.project.tasks = [];
    }

    console.log('PROJECT:', this.project);

    const allTasks: Task[] = await this.taskService.getTasks();
    this.tasks = allTasks.filter(task => task.project.id === this.project.id);

    console.log('PROJECT TASKS:', this.tasks);

    this.graph = new dagreD3.graphlib.Graph().setGraph({});

    if (!this.tasks.length) {
      return;
    }

    this.tasks.forEach(task => {
      let fillColor = '#cd5555';
      let textColor = '#ffffff';

      if (task.complete) {  // Completed (green)
        fillColor = '#0b6623';
      } else if (task.assignees.length  && !task.complete) {  // In progress (yellow)
        fillColor = '#ffcc00';
        textColor = '#000000';
      } else if (this.checkAvailability(task)) {  // Available to work on (white)
        fillColor = '#ffffff';
        textColor = '#000000';
      }

      this.graph.setNode(task.id, {
        label: task.name,
        labelStyle:
          'font-weight: 300;'
          + 'font-size: 16px;'
          + 'font-family: "Roboto Condensed";'
          + 'cursor: pointer;'
          + 'fill: ' + textColor,
        style:
          'stroke: #000;'
          + 'stroke-width: 2px;'
          + 'cursor: pointer;'
          + 'fill: ' + fillColor,
        task: task
      });
    });

    this.tasks.forEach(task => {
      task.prerequisites.forEach(pre => {
        this.graph.setEdge(pre.id, task.id, {
          arrowhead: 'vee',
          curve: d3.curveBasis
        });
      });
    });

    this.svg.selectAll('*').remove();
    const inner = this.svg.append('g');

    this.render(inner, this.graph);

    this.svg.selectAll('g.node').on('click', id => this.nodeClicker(id));

    const xCenterOffset = (this.svg.attr('width') - this.graph.graph().width) / 2;
    inner.attr('transform', 'translate(' + xCenterOffset + ', 20)');
    this.svg.attr('height', this.graph.graph().height + 40);
  }

  private checkAvailability(task: Task): boolean {
    let available = true;
    task.prerequisites.forEach(pre => {
      if (!this.tasks.find(t => t.id === pre.id).complete) {
        available = false;
      }
    });
    return available;
  }

  private addTask(): void {
    const dialogRef = this.dialog.open(DialogAddTaskComponent, {
      width: '350px',
      data: {
        project: this.project,
        tasks: this.tasks
      }
    });

    dialogRef.afterClosed().subscribe(async newTask => {
      if (newTask !== undefined) {
        console.log('NEW TASK:', newTask);
        console.log(typeof newTask.prerequisites);

        await this.taskService.addTask(newTask);
        this.initGraph();
      }
    });
  }

  private deleteTask(): void {
    // this.taskService.deleteTask(this.selectedTask.id);
    // this.projectService.removeTaskFromProject(this.project.id, this.selectedTask.id);
    // this.initGraph();
  }

  private saveTask(): void {
    // this.taskService.saveTask(this.selectedTask);
    // this.initGraph();
  }

  private nodeClicker(id: string): void {
    const node = this.graph.node(id);
    this.selectedTask = node.task;
    console.log('SELECTED TASK:', node.task);
    // this.selectedTaskPrereqs = this.tasks.filter(task => task.id !== this.selectedTask.id);
    // this.userService.getUsersByUIDs(node.task.assignees).subscribe(users => node.task._assignees = users);
  }

  private finishTask(): void {
    // this.selectedTask.finishTask(currentUser);
  }
}
