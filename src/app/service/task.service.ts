import { Injectable } from '@angular/core';
import { ITask, ITaskID } from '../shared/models/tasks.model';
import { APIService } from './API.service';
import { Observable, Subject, of, tap } from 'rxjs';
import { ROUTE_CONSTANTS } from '../shared/models/route-constants';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public subject: Subject<ITaskID[]> = new Subject();
  private routeConstants = ROUTE_CONSTANTS;
  private taskList!:ITaskID[];
  
  constructor(private api: APIService) {
  }
  updateData(newData: ITaskID[]) {
    this.subject.next(newData)
  }
  getDeletedList(): Observable<ITaskID[]> {
    return of(this.api.get().filter((task, index) => task.isDeleted));
  }

  getImportantList(): Observable<ITaskID[]> {
    return of(
      this.api
        .get()
        .filter(
          (task, index) => task.isImportant && !task.isDone && !task.isDeleted
        )
    );
  }

  getMyList(): Observable<ITaskID[]> {
    return of(
      this.api.get().filter((task, index) => !task.isDone && !task.isDeleted)
    );
  }

  getDoneList(): Observable<ITaskID[]> {
    return of(
      this.api.get().filter((task, index) => task.isDone && !task.isDeleted)
    );
  }

  getAll(): Observable<ITaskID[]> {
    return of(this.api.get());
  }

  add(task: ITask): Observable<ITaskID> {
    const newTask = this.api.add({ ...task, isDeleted: false, isDone: false });
    this.updateData([...this.taskList, newTask])
    return of(newTask);
  }

  modifyStatus(id: number, status: { key: string; value: boolean }): void {
    this.api.modify(id, status);
  }

  public filterTaskList(route:string):Observable<[string, ITaskID[]]> {
    switch (route) {
      case this.routeConstants.IMPORTANT: {
        this.getImportantList()
          .pipe(tap((res) => {
            this.taskList = res;
            this.updateData(res);
          })).subscribe();
        return of(['Важные задачи', this.taskList]);
      }
      case this.routeConstants.DONE: {
        this.getDoneList()
          .pipe(tap((res) => {
            this.taskList = res;
            this.updateData(res);
          })).subscribe();
        return of(['Выполненные задачи', this.taskList]);
      }
      case this.routeConstants.DELETED: {
        this.getDeletedList()
          .pipe(tap((res) => {
            this.taskList = res;
            this.updateData(res);
          })).subscribe();
        return of(['Удаленные задачи', this.taskList]);
      }
      default: {
        this.getMyList()
          .pipe(tap((res) => {
            this.taskList = res;
            this.updateData(res);
          })).subscribe();
        return of(['Мои задачи', this.taskList]);
      }
    }
  }
}

