import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ITask, ITaskID } from '../../models/tasks.model';
import { TaskService } from '../../../service/task.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    CommonModule,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  @ViewChild('sideItem') sideItem!: MatSidenav;
  public newTask: FormGroup;
  public newTaskID: ITaskID | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.newTask = this.formBuilder.group({
      name: [''],
      deadline: [''],
      deadlineTime: [''],
      created: [new Date()],
      description: [''],
      productivity: [''],
      health: [''],
      education: [''],
      isUrgent: [''],
      important: [''],
      status: [''],
    });
  }

  onClose() {
    this.sideItem.close();
  }
  onOpen() {
    this.sideItem.open();
  }
  postNewTask() {
    const newTask: ITask = {
      name: this.newTask.value.name,
      deadline: new Date(this.newTask.value.deadline),
      deadlineTime: new Date(this.newTask.value.deadlineTime),
      created: new Date(),
      description: this.newTask.value.description,
      tags: [],
      isDeleted: false,
      isDone: false,
      isImportant: this.newTask.value.important,
    };
    if (this.newTask.value.productivity)
      newTask.tags.push({ text: 'Продуктивность', class: 'productivity' });
    if (this.newTask.value.health)
      newTask.tags.push({ text: 'Здоровье', class: 'health' });
    if (this.newTask.value.education)
      newTask.tags.push({ text: 'Образование', class: 'education' });
    if (this.newTask.value.isUrgent)
      newTask.tags.push({ text: 'Срочно', class: 'urgent' });
    this.taskService
      .add(newTask)
      .pipe(tap(() => () => this.taskService.filterTaskList(this.router.url.slice(1))))
      .subscribe();
    this.sideItem.close();
  }
}
