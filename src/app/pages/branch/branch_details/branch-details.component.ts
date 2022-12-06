import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch.service';
import { ThemeServiceService } from 'src/app/core/services/theme-service.service';
import { Branch } from 'src/app/shared/entity/branch';


@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit {


  public branches: any[] = [];
  public newBranchName: string|undefined;

  public newBranchColor: string = "dark";
  public slot: string = "error";
  public errorValue: string|undefined;

  constructor(private branchService: BranchService, private router: ActivatedRoute, private designService: ThemeServiceService)
  {
  }

  ngOnInit(): void
  {
    this.branchService.updateFromServer().then(() => {
      this.getAllBranches();
    });
  }

  getAllBranches()
  {
    this.branches = this.branchService.branches;
    this.branches.forEach(br => {
      br.editMode = true;
    });
  }

  checkInput(event: any) {
  
    this.errorValue= undefined;
    this.newBranchColor = "dark";
    this.newBranchName = event.detail.value;
  }


  private checkError(error: any): string|undefined
  {
    if(!error) return undefined;
    this.newBranchColor = "danger";
    if(error === 19) {
      return "Dieser Name existiert bereits. Bitte einen anderen Wählen.";
    } else if (error === "NAME_INVALID") {
      return "Der Name darf keine Sonderzeichen oder Zahlen enthalten";
    } else {
      return "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
    }
  }
  public async addNewBranch()
  {
    if(!this.newBranchName) {
      this.newBranchColor = "danger";
      return;
    }
    let error = await this.branchService.addBranch(new Branch(this.newBranchName));
    if(error) {
      this.errorValue = this.checkError(error);
    }
    else 
    {
      this.getAllBranches();
      this.newBranchName = undefined;
    }
  }

  public updateBranch(event: any, branch: any)
  {
    branch.errorValue = undefined;
    branch.name = event.detail.value;
  }

  public async acceptUpdate(branch: any)
  {
    let error = await this.branchService.updateBranch(branch);
    if(error) {
      branch.errorValue = this.checkError(error);
    }
    else this.getAllBranches();
  }

  public activateUpdateMenu(branch: any)
  {
    branch.editMode = false;
  }

  public async deleteBranch(branch: Branch)
  {
    if(branch.id) await this.branchService.deleteBranch(branch.id);
    this.getAllBranches();
  }
  
}
