import { Injectable } from '@angular/core';
import { ITask } from '../shared/models/tasks.model';
import { APIService } from './API.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private api: APIService) {}

  getDeleted(): ITask[] {
    return this.api.get().filter((task) => task.status === 'deleted');
  }

  getImportant(): ITask[] {
    return this.api.get().filter((task) => task.status === 'important');
  }

  get(): ITask[] {
    return this.api
      .get()
      .filter(
        (task) => task.status === 'important' || task.status === undefined
      );
  }

  getAll(): ITask[] {
    return this.api.get()
  }

  getDone(): ITask[] {
    return this.api.get().filter((task) => task.status === 'done');
  }

  add(task: ITask): number {
    return this.api.add(task);
  }
  
  delete(id: number):ITask[] {
    return this.api.delete(id);
  }
}
