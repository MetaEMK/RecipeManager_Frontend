import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { GeneralAddComponent } from 'src/app/components/general-editing/general-add/general-add.component';
import { BranchService } from 'src/app/core/services/branch.service';
import { Query, QueryItem } from 'src/app/core/query';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ApiError } from 'src/app/model/apierror.model';
import { Branch } from 'src/app/model/branch.model';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';

@Component({
  selector: 'app-branch-overview',
  templateUrl: './branch-overview.component.html',
  styleUrls: ['./branch-overview.component.css']
})
export class BranchOverviewComponent implements OnInit {

  public filteredBranches: GeneralModelWithRouting[] = [];
  public loading: Boolean = true;

  constructor(
    public branchService: BranchService,
    private router: Router,
    public themeService: SettingsService,
    public modalContoller: ModalController,
    public toastController: ToastController
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.branchService.getAll().then((branches) => {
      this.filteredBranches = branches;
      this.loading = false;
    })
    .catch(async (error: ApiError) => {
      this.loading = false;
      const toast = await this.toastController.create({
        position: "top",
        message: error.messageForUser,
        color: "danger",
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          },
        ]
      });
      await toast.present();
      console.warn(error);
    });
  }


  public async onAddBranch(): Promise<void> {
    const modal = await this.modalContoller.create({
      component: GeneralAddComponent,
      componentProps: {
        title: "Abteilung",
        description: "Geben Sie einen Namen für die neue Abteilung ein.",
        service: this.branchService
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data)
      this.ngOnInit();
  }

  public searchByQuery(queryValue: string){
    this.loading = true;
    const query = new Query(new QueryItem("name", [queryValue]));
    this.branchService.getByQuery(query).then((branches) => {
      this.filteredBranches = branches;
      this.loading = false;
    })
    .catch(async (error: ApiError) => {
      this.loading = false;
      const toast = await this.toastController.create({
        position: "top",
        message: error.messageForUser,
        color: "danger",
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          },
        ]
      });
      await toast.present();
      console.warn(error);
    });
  }
  
  public navigateToBranch(branch: GeneralModelWithRouting)
  {
    this.router.navigate(["/branches", branch.slug]);
  }
  
}
