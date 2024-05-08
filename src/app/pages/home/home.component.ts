import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterOutlet } from '@angular/router';
import { ROUTE_CONSTANTS } from '../../shared/models/route-constants';
import { MatIconModule } from '@angular/material/icon';
import { MatButton} from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { AddTaskComponent } from '../../shared/components/add-task/add-task.component';
import { ITag, TAG } from '../../shared/models/tasks.model';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatButton,
    AddTaskComponent,
    MatDivider,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: AddTaskComponent;
  public routeConstants = ROUTE_CONSTANTS;
  public activeTab: string = '';
  public tags: ITag[] = TAG;

  constructor(private router: Router, private taskService: TaskService) {}
  
  ngOnInit(): void {
    this.getCurrentRoute();
    
  }
  toggleTag(data: ITag) {
    data.isActive = !data.isActive;
    const selectedTags: string[] = this.tags.filter(tag => tag.isActive).map(tag => tag.class);
    if (selectedTags.length > 0) {
      this.taskService.getByTagList(selectedTags).subscribe();
      this.router.navigate([this.routeConstants.SEARCH]);
    } else {
      this.taskService.filterTaskList(this.router.url.slice(1)).subscribe();
      this.activeTab = this.routeConstants.MY_TASKS;
      this.router.navigate([this.routeConstants.HOME]);
    }
  }
  private getCurrentRoute() {
    this.activeTab = this.router.url.split('/')[1];
  }

  handleActiveTab(tab: string): void {
    this.activeTab = tab;
    const elements = document.getElementsByClassName('active');
    Array.from(elements).map(el => el.className='tag')
    this.router.navigate([ROUTE_CONSTANTS.HOME, tab]);
  }
  createTask() {
    this.sidenav.onOpen();
  }
}
