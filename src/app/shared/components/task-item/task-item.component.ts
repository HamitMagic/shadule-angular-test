import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITaskID } from '../../models/tasks.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent implements OnInit {
  @Input() task!: ITaskID;
  @Input() class: string = '';
  @Output() update: EventEmitter<any> = new EventEmitter();
  public checked!: boolean;
  public deleted!: boolean;

  constructor() {}

  ngOnInit(): void {
    this.checked = this.task.isDone;
    this.deleted = this.task.isDeleted;
  }
  toggleFinishTask() {
    this.checked = !this.checked;
    this.update.emit({isDone: this.checked});
  }
  deleteTask() {
    this.update.emit({isDeleted: true});
  }
  restoreTask() {
    this.update.emit({isDeleted: false});
  }
}
