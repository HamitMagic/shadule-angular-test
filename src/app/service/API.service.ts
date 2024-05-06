import { Injectable } from '@angular/core';
import { ITask } from '../shared/models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class APIService {

  constructor() {}
	
	get() {
		try {
			const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
			return tasks as ITask[];
		} catch (error) {
			throw new Error('ошибка получения данных');
		}
	}

	add(task: ITask):number {
		const tasks:ITask[] = this.get();
		task.id = Math.random()*1000000;
		tasks.push(task);
		try {
			localStorage.setItem('tasks', JSON.stringify(tasks))
			return task.id;
		} catch (error) {
			throw new Error('ощибка записи данных');
		}
	}
	delete(id: number):ITask[] {
		const tasks: ITask[] = this.get().map((task) => task.id === id ? {...task, status: 'deleted'} : task );
		try {
			localStorage.setItem('tasks', JSON.stringify(tasks))
			return tasks;
		} catch (error) {
			throw new Error(`ощибка удаления ${id} задачи`);
		}
	}
}
