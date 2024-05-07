import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ITaskID } from '../../shared/models/tasks.model';
import { ROUTE_CONSTANTS } from '../../shared/models/route-constants';
import { TaskService } from '../../service/task.service';
import { MatIconModule } from '@angular/material/icon';
import { TaskItemComponent } from '../../shared/components/task-item/task-item.component';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [MatIconModule, TaskItemComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  public taskList!: ITaskID[];
  public shownTaskList!: ITaskID[];
  public text!: string;
  public pre = 0;
  public next = 4;
  private routeConstants = ROUTE_CONSTANTS;

  constructor(private router: Router, private taskService: TaskService) {
    this.taskList = this.filterTaskList();
    console.log( this.taskList);
    this.changeShownTasks();
  }
  private filterTaskList(): ITaskID[] {
    switch (this.router.url.slice(1)) {
      case this.routeConstants.IMPORTANT: {
        this.text = 'Важные задачи';
        return this.taskService.getUrgentList();
      }
      case this.routeConstants.DONE: {
        this.text = 'Выполненные задачи';
        return this.taskService.getDoneList();
      }
      case this.routeConstants.DELETED: {
        this.text = 'Удаленные задачи';
        return this.taskService.getDeletedList();
      }
      default: {
        this.text = 'Мои задачи';
        return this.taskService.getMyList();
      }
    }
  }
  nextTasks() {
    this.next = Math.min(this.next+5, this.taskList.length-1);
    this.pre = this.taskList.length < this.pre+5 ? this.pre : this.pre+5;
    this.changeShownTasks();
  }
  previousTasks() {
    this.pre = Math.max(this.pre-5, 0);
    this.next = Math.max(this.pre+4, 4);
    this.changeShownTasks();
  }
  
  private changeShownTasks() {
    this.shownTaskList = [];
    for (let i = this.pre; i <= Math.min(this.next,this.taskList.length-1); i++) {
      this.shownTaskList.push(this.taskList[i]);
    }
  }
}
