import { Component } from '@angular/core';

@Component({
  selector: 'app-done-tasks',
  standalone: true,
  imports: [],
  templateUrl: './done-tasks.component.html',
  styleUrl: './done-tasks.component.css',
})
export class DoneTasksComponent {
  title = 'выполенные задачи';
}
