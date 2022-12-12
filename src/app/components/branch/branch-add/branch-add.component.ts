import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BranchService } from 'src/app/core/services/branch.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ApiError } from 'src/app/model/apierror.model';

@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrls: ['./branch-add.component.css']
})
export class BranchAddComponent implements OnInit
{

  public branchName?: string;
  public loading: boolean = false;

  constructor(
    public themeService: SettingsService,
    public branchService: BranchService,
    public toastController: ToastController
  ) { }

  ngOnInit(): void
  {
  }

  public async addBranch()
  {
    let toast;
    this.loading = true;
    if (this.branchName){
      try
      {
        await this.branchService.create(this.branchName);
        toast = await this.toastController.create({
          position: 'top',
          message: 'Abteilung erfolgreich hinzugefügt',
          duration: 3000,
          color: 'success'
        });
      } catch (err)
      {
        const error = err as ApiError;
        toast = await this.toastController.create({
          position: 'top',
          message: error.messageForUser,
          duration: 3000,
          color: 'danger'
        });
      }
      toast.present();
    }

    this.loading = false;
  }
}
