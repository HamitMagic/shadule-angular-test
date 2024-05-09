import { Injectable } from '@angular/core';
import { ITask, ITaskID } from '../shared/models/tasks.model';

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
      return this.get().filter((task) => task.id === id);
    } catch (error) {
      throw new Error('не нашел(((');
    }
  }
  add(task: ITask): ITaskID {
    const tasks: ITaskID[] = this.get();
    const newTask: ITaskID = { ...task, id: Math.random() * 100000000000 };
    tasks.push(newTask as ITaskID);
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return newTask;
    } catch (error) {
      throw new Error('ощибка записи данных');
    }
  }

  modify(id: number, status: { key: string; value: boolean }):void {
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
