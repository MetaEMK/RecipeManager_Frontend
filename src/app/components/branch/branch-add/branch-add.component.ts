import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/core/services/branch.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ApiError } from 'src/app/model/apierror.model';

@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrls: ['./branch-add.component.css']
})
export class BranchAddComponent implements OnInit
{

  public branchName?: string;
  public nameError?: string;
  public loading: boolean = false;

  constructor(
    public themeService: ThemeService,
    public branchService: BranchService
  ) { }

  public get nameTheme(): string
  {
    if (this.nameError)
      return "danger";
    else
      return this.themeService.opposittheme;
  };

  ngOnInit(): void
  {
  }

  public async addBranch()
  {
    this.loading = true;
    this.nameError = undefined;
    if (this.branchName){
      try
      {
        await this.branchService.createBranch(this.branchName);
        console.log("test");
      } catch (err)
      {
        const error = err as ApiError;
        this.nameError = error.messageForUser;
        console.log(error.messageForUser);
      }
    }
    this.loading = false;
  }
}
