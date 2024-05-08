import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITaskID, TStatusKeys } from '../../shared/models/tasks.model';
import { TaskService } from '../../service/task.service';
import { MatIconModule } from '@angular/material/icon';
import { TaskItemComponent } from '../../shared/components/task-item/task-item.component';
import { Subscription, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [MatIconModule, TaskItemComponent,CommonModule,FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit, OnDestroy {
  public taskList!: ITaskID[];
  public searchText: string = '';
  public shownTaskList!: ITaskID[];
  public text!: string;
  public pre = 0;
  public next = 4;
  private subscription!:Subscription;

  constructor(private router: Router, private taskService: TaskService) {
    this.updateTaskList();
  }

  private updateTaskList() {
    this.taskService
      .filterTaskList(this.router.url.slice(1))
      .subscribe((res) => ([this.text, this.taskList] = res));
  }

  ngOnInit(): void {
    this.subscription = this.taskService.subject.subscribe((newData) => {
      this.taskList = newData;
      this.changeShownTasks();
    });
    this.changeShownTasks();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  nextTasks() {
    this.next = Math.min(this.next + 5, this.taskList.length - 1);
    this.pre = this.taskList.length < this.pre + 5 ? this.pre : this.pre + 5;
    if (!this.searchText) this.changeShownTasks();
  }
  previousTasks() {
    this.pre = Math.max(this.pre - 5, 0);
    this.next = Math.max(this.pre + 4, 4);
    if (!this.searchText) this.changeShownTasks();
  }
  updateStatus(task: ITaskID, status: { key: TStatusKeys; value: boolean }) {
    task[status.key] = status.value;
    this.taskService.modifyStatus(task.id, status);
    this.updateTaskList();
    if (!this.searchText) this.changeShownTasks();
  }
  private changeShownTasks() {
    this.shownTaskList = [];
    for (let i = Math.max(this.pre, 0); i <= Math.min(this.next, this.taskList.length - 1); i++) {
      this.shownTaskList.push(this.taskList[i]);
    }
  }
  
  searchByName(searchText: string) {
    if (!searchText) return
    this.taskService.getAll().pipe(tap((res) => 
      this.taskList = res.filter(
        task => task.name.toLowerCase().includes(searchText.toLowerCase())
      )
    )).subscribe();
    this.changeShownTasks();
  }
}
