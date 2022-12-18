import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ScheduleAddItemModalComponent } from 'src/app/components/schedule-components/schedule-add-item-modal/schedule-add-item-modal.component';
import { Query } from 'src/app/core/query';
import { BranchService } from 'src/app/core/services/branch.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Branch } from 'src/app/model/branch.model';
import { ScheduleItem, scheduleItemDay } from 'src/app/model/scheduleItem.model';

@Component({
  selector: 'app-scheduler-details',
  templateUrl: './scheduler-details.component.html',
  styleUrls: ['./scheduler-details.component.css', "../../../../theme/theme.css"]
})
export class SchedulerDetailsComponent implements OnInit {

  public branch!: Branch;

  public day!: number;  

  public scheduleItems: ScheduleItem[] = [];

  public scheduleItemDay = scheduleItemDay;


  constructor(
    public taostController: ToastController,
    public branchService: BranchService,
    public scheduleService: ScheduleService,
    public route: ActivatedRoute,
    public router: Router,
    public modalController: ModalController,
    private alertController: AlertController
  ) { }

  async ngOnInit(): Promise<void> {
    console.log('SchedulerDetailsComponent.ngOnInit()');
    const params = this.route.snapshot.paramMap;

    if(!params.has('branchId') || !params.has('day')) 
      this.router.navigate(['/404']);
    else
    {
      this.branch = await this.branchService.getById(parseInt(params.get('branchId')!));
      this.day = parseInt(params.get('day')!);
    }
    await this.getScheduleItems();

  }

  public async getBranch(): Promise<void> {
    try {
      this.branch = await this.branchService.getById(this.branch.id);
    } catch (error: any) {
      const toast = await this.taostController.create({
        position: 'top',
        color: 'danger',
        message: error.message,
        duration: 2000
      });
      await toast.present();
    }
  }

  public async getScheduleItems(): Promise<void> {
    let query = new Query();

    query.add('day', this.day.toString());

    try {
      this.scheduleItems = await this.scheduleService.getAllByBranchId(this.branch.id, query);
    } catch (error: any) {
      const toast = await this.taostController.create({
        position: 'top',
        color: 'danger',
        message: error.message,
        duration: 2000
      });
      await toast.present();
    }
  }

  public async addScheduleItem() {
    const modal = await this.modalController.create({
      component: ScheduleAddItemModalComponent,
      componentProps: {
        branch: this.branch,
        day: this.day
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if(data) {
      await this.getScheduleItems();
    }
  }

  public async deleteScheduleItem(scheduleItem: ScheduleItem): Promise<void> {
    const alert = await this.alertController.create({
      header: "Soll die Variante aus dem Planer wirklich gelöscht werden?",
      buttons: [
        {
          text: "Abbrechen",
          role: "cancel"
        },
        {
          text: "Ok",
          role: "confirm"
        }
      ]
    });    
    
    await alert.present();

    const { role } = await alert.onDidDismiss();
    
    if (role === "confirm") {
      let toast: any;

      try {
        await this.scheduleService.deleteScheduleItem(this.branch.id, scheduleItem.id);
        this.scheduleItems = this.scheduleItems.filter(item => item.id !== scheduleItem.id);
        toast = await this.taostController.create({
          position: 'top',
          color: 'success',
          message: 'Item wurde erfolgreich gelöscht',
          duration: 3000
        });
        
      } catch (error: any) {
        toast = await this.taostController.create({
          position: 'top',
          color: 'danger',
          message: error.message,
          duration: 2000
        });
  
      }
      await toast.present();
    }
  }
}
