import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButton} from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { AddTaskComponent } from '../../shared/components/add-task/add-task.component';
import { ITag } from '../../shared/models/tag.model';
import { TagService } from '../../service/tag.service';
import { ActiveTabService } from '../../service/activeTab.service';
import { ROUTE_CONSTANTS } from '../../shared/models/route-constants';

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
  public activeTab: string = this.activeTabService.get();
  public routeConstants = ROUTE_CONSTANTS;
  public tags!: ITag[];
  
  constructor(
    private router: Router,
    private tagService: TagService,
    private activeTabService: ActiveTabService
  ) {
    
  }
  ngOnInit(): void {
    this.activeTab = this.activeTabService.set(this.router.url.split('/')[1]);
    this.tags = this.tagService.tags;
  }
  toggleTag(tag: ITag) {
    if (this.tagService.toggle(tag)) this.activeTab = this.activeTabService.set(this.routeConstants.SEARCH)
    else this.activeTab = this.activeTabService.set(this.routeConstants.MY_TASKS);
  }
  handleActiveTab(tab: string) {
    this.tagService.resetAll();
    this.activeTab = this.activeTabService.set(tab)
  }
  createTask() {
    this.sidenav.onOpen();
  }
}
