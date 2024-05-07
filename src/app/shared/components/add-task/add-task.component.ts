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
import { ITask } from '../../models/tasks.model';
import { TaskService } from '../../../service/task.service';
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
  public newTaskID: number | undefined;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router) {
    this.newTask = this.formBuilder.group({
      name: [''],
      deadline: [''],
      deadlineTime: [''],
      created: [new Date()],
      description: [''],
      productivity: false,
      health: false,
      education: false,
      urgent: false,
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
      status: undefined,
      isUrgent: this.newTask.value.urgent,
    };
    if (this.newTask.value.productivity) newTask.tags.push('productivity');
    if (this.newTask.value.health) newTask.tags.push('health');
    if (this.newTask.value.education) newTask.tags.push('education');
    if (this.newTask.value.urgent) newTask.tags.push('urgent');
    this.newTaskID = this.taskService.add(newTask);
    this.sideItem.close()
  }
}
