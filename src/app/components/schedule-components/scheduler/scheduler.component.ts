import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BranchService } from 'src/app/core/services/branch.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Branch } from 'src/app/model/branch.model';
import { ScheduleItem, scheduleItemDay } from 'src/app/model/scheduleItem.model';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit, OnChanges {

  @Input()
  public branch!: Branch;

  public scheduleItems: Map<number, ScheduleItem[]> = new Map<number, ScheduleItem[]>();
  public days: number[] = [1,2,3,4,5,6,7];

  public getColor(day: number){
    if(day === new Date().getDay()){
      return 'warning';
    }
    return undefined
  }

  public scheduleItemDay = scheduleItemDay;

  constructor(
    public branchService: BranchService,
    public scheduleService: ScheduleService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.orderScheduleItems();

    let test = new Date();
    console.log(test.getDay());
  }

  async ngOnChanges(event: any): Promise<void> {
    console.log(event);
    await this.orderScheduleItems();
  }

  public async orderScheduleItems() {
    
    let list = await this.scheduleService.getAllByBranchId(this.branch.id);
    this.scheduleItems = new Map<number, ScheduleItem[]>();

    this.days.forEach((day) => {
      this.scheduleItems.set(day, list.filter(item => item.day == day));
    });

    console.log(this.days);

    
    // scheduleItemDay.forEach((day) => {
    //   this.scheduleItems.set(index, list.filter(item => item.day == index));
    // }

  }
}