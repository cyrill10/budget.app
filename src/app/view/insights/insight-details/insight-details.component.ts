import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { InsightsService } from '../../../services/insights.service';
import { ActivatedRoute } from '@angular/router';
import {
  InsightElement,
  Insights,
  InsightType,
} from '../../../element/insights';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ChartData, ChartType } from 'chart.js';
import { DateService, Month } from '../../../services/date.service';
import { VirtualAccountService } from '../../../services/virtualaccount.service';
import { VirtualAccount } from '../../../element/virtualaccount';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-insight-details',
  templateUrl: './insight-details.component.html',
  styleUrls: ['./insight-details.component.scss'],
})
export class InsightDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private insightService = inject(InsightsService);
  private dateService = inject(DateService);
  private virtualAccountService = inject(VirtualAccountService);
  @ViewChild('drawer') drawer!: MatDrawer;

  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  years$: Observable<number[]>;
  months: Month[];

  insights$: Observable<Insights>;
  virtualAccounts$: Observable<VirtualAccount[]>;

  selectedMonths: number[];
  selectedYears: number[];
  selectedAccounts: VirtualAccount[];

  ngOnInit() {
    const insightsType: InsightType =
      this.activatedRoute.snapshot.queryParams['type'];

    this.months = this.dateService.getAllMonthsInYear();

    this.virtualAccounts$ = this.virtualAccountService
      .getVirtualAccounts()
      .pipe(
        tap((accounts) => {
          this.selectedAccounts = accounts;
        }),
      );

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    this.selectedMonths = [currentMonth];
    this.selectedYears = [currentYear];

    this.insights$ = this.insightService
      .getInsights(insightsType, [currentYear], [currentMonth])
      .pipe(
        tap((insights) => {
          this.updateChartData(insights.insights);
        }),
      );

    this.years$ = this.dateService.getMonths().pipe(
      map((months) => {
        let result: number[] = [];
        for (let year = months[0].getFullYear(); year <= currentYear; year++) {
          result.push(year);
        }
        return result;
      }),
    );
  }

  private updateChartData(insights: InsightElement[]): void {
    this.pieChartData.labels = insights.map((insight) => insight.name);
    this.pieChartData.datasets[0].data = insights.map(
      (insight) => insight.amount,
    );

    // Generate random colors for each segment
    this.pieChartData.datasets[0].backgroundColor = insights.map(() =>
      this.getRandomColor(),
    );
  }

  // Helper function to generate a random color
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  applyFilters(): void {
    this.fetchInsights();
    this.drawer.close();
  }

  private fetchInsights(): void {
    const insightsType: InsightType =
      this.activatedRoute.snapshot.queryParams['type'];
    this.insights$ = this.insightService
      .getInsights(
        insightsType,
        this.selectedYears,
        this.selectedMonths,
        this.selectedAccounts.map((a) => a.id),
      )
      .pipe(
        tap((insights) => {
          this.updateChartData(insights.insights);
        }),
      );
  }
}
