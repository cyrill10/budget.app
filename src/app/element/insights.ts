export class InsightElement {
  name: string;
  amount: number;
}

export class Insights {
  insights: InsightElement[];
}

export class InsightsRequest {
  insightType: InsightType;
  years?: number[];
  months?: number[];
}

export type InsightType = 'INCOME' | 'SPENDINGS' | 'SAVINGS';
