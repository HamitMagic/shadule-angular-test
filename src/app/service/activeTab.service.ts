import { Injectable } from '@angular/core';
import { ROUTE_CONSTANTS } from '../shared/models/route-constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ActiveTabService {
  private activeTab: string = '';
  public routeConstants = ROUTE_CONSTANTS;

  constructor(private router: Router) {}

  set(tab: string): string {
    this.activeTab = tab;
    this.router.navigate([ROUTE_CONSTANTS.HOME, tab]);
    return this.activeTab;
  }
  get():string {
    return this.activeTab;
  }
}
