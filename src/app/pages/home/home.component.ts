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
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getCurrentRoute();
  }
  toggleTag(tag: ITag) {
    tag.isActive = !tag.isActive;
  }
  private getCurrentRoute() {
    this.activeTab = this.router.url.split('/')[1];
  }

  handleActiveTab(tab: string): void {
    this.activeTab = tab;
    this.router.navigate([ROUTE_CONSTANTS.HOME, tab]);
  }
  createTask() {
    this.sidenav.onOpen();
  }
}
