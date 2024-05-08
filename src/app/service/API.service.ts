import { Injectable } from '@angular/core';
import { ITask, ITaskID } from '../shared/models/tasks.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor() {}

  get() {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      return tasks as ITaskID[];
    } catch (error) {
      throw new Error('ошибка получения данных');
    }
  }
  getByID(id: number) {
    try {
      return of(this.get().find((task) => task.id === id));
    } catch (error) {
      throw new Error('не нашел(((');
    }
  }
  add(task: ITask): ITaskID {
    const tasks: ITaskID[] = this.get();
    const data: ITaskID = { ...task, id: Math.random() * 100000000000 };
    tasks.push(data as ITaskID);
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return data;
    } catch (error) {
      throw new Error('ощибка записи данных');
    }
  }

  modify(id: number, status: { key: string; value: boolean }) {
    const tasks: ITaskID[] = this.get().map((task) =>
      task.id === id ? { ...task, ...status } : task
    );
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      throw new Error(`ощибка изменения статуса ${id} задачи`);
    }
  }
}
