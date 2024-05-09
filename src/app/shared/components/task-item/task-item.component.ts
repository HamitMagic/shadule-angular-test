import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITaskID } from '../../models/tasks.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogData } from '../../models/dialog-data';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, CdkDragHandle],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent implements OnInit {
  @Input() task!: ITaskID;
  @Input() class: string = '';
  @Input() searchText: string = '';
  @Output() update: EventEmitter<any> = new EventEmitter();
  public checked!: boolean;
  public deleted!: boolean;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.checked = this.task.isDone;
    this.deleted = this.task.isDeleted;
  }
  toggleFinishTask() {
    this.checked = !this.checked;
    this.update.emit({ isDone: this.checked });
  }
  private deleteTask() {
    this.update.emit({ isDeleted: true });
  }
  onDeleteTask(data: DialogData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '480px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteTask()
    });
  }
  restoreTask() {
    this.update.emit({ isDeleted: false });
  }
}
