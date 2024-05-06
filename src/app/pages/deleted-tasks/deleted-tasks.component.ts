import { Component } from '@angular/core';

@Component({
  selector: 'app-deleted-tasks',
  standalone: true,
  imports: [],
  templateUrl: './deleted-tasks.component.html',
  styleUrl: './deleted-tasks.component.css',
})
export class DeletedTasksComponent {
  title = 'удаленные задачи';
}
