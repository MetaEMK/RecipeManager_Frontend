import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Branch } from 'src/app/model/branch.model';
import { ScheduleItem, scheduleItemDay } from 'src/app/model/scheduleItem.model';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css', '../../../../theme/theme.css']
})
export class SchedulerComponent implements OnInit, OnChanges
{

  @Input()
  public branch!: Branch;

  public scheduleItems: Map<number, ScheduleItem[]> = new Map<number, ScheduleItem[]>();
  public days: number[] = [1, 2, 3, 4, 5, 6, 7];

  public getColor(day: number)
  {
    let currentDay = new Date().getDay();
    if (currentDay === 0) currentDay = 7;
    if (day === currentDay)
    {
      return 'tertiary';
    }
    return undefined;
  }

  public scheduleItemDay = scheduleItemDay;

  constructor(
    public branchService: BranchService,
    public scheduleService: ScheduleService,
    public router: Router
  ) { }

  async ngOnInit(): Promise<void>
  {
    await this.orderScheduleItems();
  }

  async ngOnChanges(event: any): Promise<void>
  {
    console.log(event);
    await this.orderScheduleItems();
  }

  public async orderScheduleItems()
  {

    let list = await this.scheduleService.getAllByBranchId(this.branch.id);
    this.scheduleItems = new Map<number, ScheduleItem[]>();

    this.days.forEach((day) =>
    {
      this.scheduleItems.set(day, list.filter(item => item.day == day));
    });
  }

  public routeToScheduleDetails(day: number)
  {
    this.router.navigate(['home', 'scheduler', this.branch.id, day]);
  }

  public navigateToVariant(item: ScheduleItem)
  {
    this.router.navigate(['recipes', item.variant.recipe.id, 'variant', item.variant.id], {
      queryParams: { quantity: item.quantity, sizeId: item.size.id }
    });
  }
}