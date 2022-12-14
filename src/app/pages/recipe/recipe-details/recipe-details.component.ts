import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ApiError } from 'src/app/model/apierror.model';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  public loading: boolean = false;
  public editMode: boolean = false;

  public recipe!: Recipe;

  public newName?: string;

  constructor(
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    public themeService: SettingsService,
    private toastControler: ToastController
    
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;

    const slug = this.route.snapshot.paramMap.get('slug');
    const editMode = this.route.snapshot.queryParamMap.get("editmode");

    if(!slug) 
    {
      this.loading = false;
      console.log("No slug provided");
      this.router.navigate(["/recipes"]);
      return;
    }

    try {
      this.recipe = await this.recipeService.getBySlug(slug);
      this.loading = false;
    } catch (err) {
      let error = err as ApiError;
      this.toastControler.create({
        position: "top",
        message: error.messageForUser,
        duration: 3000,
        color: "danger"
      }).then((toast) => {
        toast.present();
      });
      this.loading = false;
      this.router.navigate(["/recipes"]);
    }
    if(editMode == "true")
      this.editMode = true;
  }

}
