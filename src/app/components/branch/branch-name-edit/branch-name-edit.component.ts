import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class BranchNameEditComponent implements OnInit, OnChanges {

  @Input() 
  public branch!: Branch;

  @Input() 
  public editMode!: boolean;


  @Output()
  public changes = new EventEmitter<string|undefined>();

  public nameEdit: boolean = false;
  public branchName?: string;
  public nameError?: string;
  public loading: boolean = false;

  constructor(
    public themeService: ThemeService,
    public branchService: BranchService,
    public router: Router,
  ) { }

  ngOnInit(): void {
      this.branchName = this.branch.name;
      this.editMode = false;
  }

  ngOnChanges(changes: any): void
  {
    if(!changes.editMode.currentValue){
      this.nameEdit = false;
      this.nameError = undefined;
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

  public changeName(event: any){
    const val = event.detail.value
    this.branchName = val;

    if(val === this.branch.name)
      this.changes.emit(undefined);
    else
      this.changes.emit(this.branchName)
  }
}
