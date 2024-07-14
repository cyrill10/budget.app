import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss'],
})
export class InsightsComponent {
  constructor(private router: Router) {}

  navigateTo(param: string): void {
    this.router.navigate([`/insights/details`], {
      queryParams: { type: param },
    });
  }
}
