import { Component, inject, OnInit } from '@angular/core';
import { InsightsService } from '../../../services/insights.service';
import { ActivatedRoute } from '@angular/router';
import {
  InsightElement,
  Insights,
  InsightType,
} from '../../../element/insights';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-insight-details',
  templateUrl: './insight-details.component.html',
  styleUrls: ['./insight-details.component.scss'],
})
export class InsightDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private insightService = inject(InsightsService);
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  insights$: Observable<Insights>;

  ngOnInit() {
    const insightsType: InsightType =
      this.activatedRoute.snapshot.queryParams['type'];
    this.insights$ = this.insightService.getInsights(insightsType).pipe(
      tap((insights) => {
        this.updateChartData(insights.insights);
      }),
    );
  }

  private updateChartData(insights: InsightElement[]): void {
    this.pieChartData.labels = insights.map((insight) => insight.name);
    this.pieChartData.datasets[0].data = insights.map(
      (insight) => insight.amount,
    );
  }
}
