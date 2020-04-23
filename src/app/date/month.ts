export class Month{
    name: string;
    short: string;
    nextMonth: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    id: number;

    constructor(name: string, short: string, nextMonth: string, startDate: string, endDate: string, isActive: boolean, id: number) {
    this.name = name;
    this.short = short;
    this.nextMonth = nextMonth;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isActive = isActive;
    this.id = id;
  }
}
