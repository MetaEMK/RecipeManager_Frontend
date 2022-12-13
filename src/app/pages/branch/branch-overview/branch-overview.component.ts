import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GeneralAddComponent } from 'src/app/components/general-editing/general-add/general-add.component';
import { BranchService } from 'src/app/core/services/branch.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { Branch } from 'src/app/model/branch.model';
import { GeneralModel } from 'src/app/model/generalModel';

@Component({
  selector: 'app-branch-overview',
  templateUrl: './branch-overview.component.html',
  styleUrls: ['./branch-overview.component.css']
})
export class BranchOverviewComponent implements OnInit {

  public filteredBranches: GeneralModel[] = [];

    constructor(
      public branchService: BranchService,
      private router: Router,
      public themeService: SettingsService,
      public modalContoller: ModalController
    ) { }
  
    ngOnInit(): void {
        this.branchService.getAll().then((branches) => {
          this.filteredBranches = branches;
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

    }

    public navigateToBranch(branch: GeneralModel)
    {
      this.router.navigate(["/branches", branch.slug]);
    }
  
}
