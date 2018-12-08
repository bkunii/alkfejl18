import { User } from 'src/app/classes/user';
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

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: [
    '../common-styles.scss',
    './project-tasks.component.scss'
  ]
})
export class ProjectTasksComponent implements OnInit {

  private render;
  private graph;
  private svg;

  private project: Project;
  private tasks: Task[];
  private selectedTask: Task;
  private users: User[];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const projectId: number = parseInt(this.route.snapshot.paramMap.get('pid'), 10);

    this.projectService.getProject(projectId).subscribe(project => this.project = project);
    this.users = this.userService.getUsers();

    this.svg = d3.select('svg');
    this.render = new dagreD3.render();
    this.graph = new dagreD3.graphlib.Graph().setGraph({});
    this.initGraph();
  }

  private initGraph(): void {

    this.projectService.getTasksOfProject(this.project.id).subscribe(tasks => this.tasks = tasks);

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
        this.graph.setEdge(pre, task.id, {
          arrowhead: 'vee',
          curve: d3.curveBasis
        });
      });
    });

    this.svg.selectAll('*').remove();
    this.svg.append('g');
    const inner = this.svg.select('g');

    this.render(inner, this.graph);

    this.svg.selectAll('g.node').on('click', id => this.nodeClicker(id));

    const xCenterOffset = (this.svg.attr('width') - this.graph.graph().width) / 2;
    inner.attr('transform', 'translate(' + xCenterOffset + ', 20)');
    this.svg.attr('height', this.graph.graph().height + 40);
  }

  private checkAvailability(task: Task): boolean {
    let available = true;
    task.prerequisites.forEach(pre => {
      if (!this.tasks.find(t => t.id === pre).complete) {
        available = false;
      }
    });
    return available;
  }

  private dateToString(date: Date): string {
    return date.toLocaleDateString('hu-HU', {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'});
  }

  private addTask(): void {
    const dialogRef = this.dialog.open(DialogAddTaskComponent, {
      width: '350px',
      data: this.project
    });

    dialogRef.afterClosed().subscribe(task => {
      if (task !== undefined) {
        this.taskService.addTask(task);
        this.project.tasks.push(task.id);
        this.tasks.push(task);
        this.initGraph();
      }
    });
  }

  private deleteTask(): void {
    this.taskService.deleteTask(this.selectedTask.id);
    this.projectService.removeTaskFromProject(this.project.id, this.selectedTask.id);
    this.initGraph();
  }

  private nodeClicker(id: string): void {
    const node = this.graph.node(id);
    this.selectedTask = node.task;
    this.userService.getUsersByUIDs(node.task.assignees).subscribe(users => node.task._assignees = users);
  }

}
