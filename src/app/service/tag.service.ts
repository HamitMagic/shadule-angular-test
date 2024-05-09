import { Injectable } from '@angular/core';
import { ITag } from '../shared/models/tag.model';
import { TaskService } from './task.service';
import { ROUTE_CONSTANTS } from '../shared/models/route-constants';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private routeConstants = ROUTE_CONSTANTS;
  public tags: ITag[] = [
    { class: 'productivity', text: 'Продуктивность' },
    { class: 'education', text: 'Образование' },
    { class: 'health', text: 'Здоровье' },
    { class: 'urgent', text: 'Срочно' },
  ];

  constructor(private taskService: TaskService) {}

  get() {
    return this.tags;
  }
  resetAll(): void {
    this.tags = this.tags.map(tag => ({...tag, isActive:false}));
    const elements = document.getElementsByClassName('active');
    Array.from(elements).map((el) => el.className = 'tag');
  }
  toggle(data: ITag) {
    data.isActive = !data.isActive;
    this.tags = this.tags.map((tag) => (tag.class === data.class ? data : tag));
    const selectedTags:string[] = this.tags.filter((tag) => tag.isActive).map(tag => tag.class);
    if (selectedTags.length > 0) {
      this.taskService.getByTagList(selectedTags).subscribe();
    } else {
      this.taskService.filterTaskList(this.routeConstants.MY_TASKS).subscribe();
    }
    return selectedTags.length !== 0;
  }
  selectOne(data:ITag) {
    data.isActive = true;
    this.tags = this.tags.map(tag => tag.class === data.class ? data : {...tag, isActive:false})
    const selectedTags: string[] = this.tags
      .filter((tag) => tag.isActive)
      .map((tag) => tag.class);
    this.taskService.getByTagList(selectedTags).subscribe();
    document.querySelectorAll('.tag').forEach(el => {
      el.className = el.id === data.class ? 'tag active' : 'tag';
    })
  }
}
