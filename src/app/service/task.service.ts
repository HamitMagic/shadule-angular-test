import { Injectable } from '@angular/core';
import { ITask, ITaskID } from '../shared/models/tasks.model';
import { APIService } from './API.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private api: APIService) {}

  getDeletedList(): ITaskID[] {
    return this.api
      .get()
      .filter((task, index) => task.status === 'deleted');
  }

  getUrgentList(): ITaskID[] {
    return this.api
      .get()
      .filter((task, index) => task.isUrgent);
  }

  getMyList(): ITaskID[] {
    return this.api
      .get()
      .filter((task, index) => task.status === undefined);
  }
  //я понимаю что так делать нельзя, а лучше написать аписервис (чтоб на бэке работал) но и такой задачи нет
  getByID(id: number): ITaskID[] {
    return this.api.get().filter((task) => task.id === id);
  }

  getAll(): ITaskID[] {
    return this.api.get();
  }

  getDoneList(): ITaskID[] {
    return this.api
      .get()
      .filter((task, index) => task.status === 'done');
  }

  add(task: ITask): number {
    return this.api.add(task);
  }

  delete(id: number): ITaskID[] {
    return this.api.delete(id);
  }
}
