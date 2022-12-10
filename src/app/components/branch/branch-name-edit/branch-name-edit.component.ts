import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ApiError } from 'src/app/model/apierror.model';
import { Branch } from 'src/app/model/branch.model';

@Component({
  selector: 'app-branch-name-edit',
  templateUrl: './branch-name-edit.component.html',
  styleUrls: ['./branch-name-edit.component.css']
})
export class BranchNameEditComponent implements OnInit {

  @Input() public branch?: Branch;

  @Output() 
  public editMode = new EventEmitter<boolean>();

  public branchName?: string;
  public nameError?: string;
  public loading: boolean = false;

  constructor(
    public themeService: ThemeService,
    public branchService: BranchService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    if(this.branch) {
      this.branchName = this.branch.name;
    }
  }

  public get nameTheme(): string
  {
    if (this.nameError)
      return "danger";
    else
      return this.themeService.opposittheme;
  };

  public async editBranchName()
  {
    if(!this.branch) return;
    this.loading = true;
    this.nameError = undefined;
    if (this.branchName){
      try
      {
        const newBranch = await this.branchService.updateBranch(this.branch.id, [], [], this.branchName);
        this.router.navigate(["/branches/" + newBranch.slug]);
        this.editMode.emit(false);
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
