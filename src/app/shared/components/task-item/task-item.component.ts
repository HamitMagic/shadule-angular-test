import { Component, Input } from '@angular/core';
import { ITaskID } from '../../models/tasks.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input() task!: ITaskID;
  @Input() delete!: (id: number) => void;

  constructor() {}

  deleteTask(id: number) {
    this.delete(id);
  }
}
