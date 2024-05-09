import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITaskID } from '../../models/tasks.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogData } from '../../models/dialog-data';
import { ITag } from '../../models/tag.model';
import { TagService } from '../../../service/tag.service';
import { ActiveTabService } from '../../../service/activeTab.service';
import { ROUTE_CONSTANTS } from '../../models/route-constants';

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
  private routeConstants = ROUTE_CONSTANTS

  constructor(private dialog: MatDialog, private tagService: TagService, private activeTabService: ActiveTabService) {}

  ngOnInit(): void {
    this.checked = this.task.isDone;
    this.deleted = this.task.isDeleted;
  }
  toggleFinishTask() {
    this.checked = !this.checked;
    setTimeout(() => this.update.emit({ isDone: this.checked }), 1000);
  }
  private deleteTask() {
    setTimeout(() => this.update.emit({ isDeleted: true }),1000);
  }
  onDeleteTask(data: DialogData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '480px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteTask();
    });
  }
  restoreTask() {
    setTimeout(() => this.update.emit({ isDeleted: false }),1000);
  }
  showByTag(tag: ITag) {
    this.tagService.selectOne(tag);
    this.activeTabService.set(this.routeConstants.SEARCH);
  };
}
