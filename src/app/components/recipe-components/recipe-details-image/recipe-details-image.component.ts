import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { ApiError } from 'src/app/model/apierror.model';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-details-image',
  templateUrl: './recipe-details-image.component.html',
  styleUrls: ['./recipe-details-image.component.css', '../../../../theme/theme.css']
})
export class RecipeDetailsImageComponent implements OnInit {

  @Input() recipe!: Recipe;

  @Input() editMode: boolean = false;

  @Output("wasSuccessfullyChanged")
  public output_imageChangeSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  public imageEditMode: boolean = false;

  public imagePath?: string;

  public newImage: any;
  public rerenderImage: boolean = true;
  
  constructor(
    private toastControler: ToastController,
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.imagePath = undefined;
    if(this.recipe?.imagePath)
      this.imagePath = this.recipe.imagePath;
      console.log(this.imagePath);
  }

  public async onFileSelected(event: any) {
    this.newImage = event.target.files[0];
    console.log(event.target.files[0]);
  }
    
  public loading: boolean = false;

  public abort(){
    this.imageEditMode = false;
    this.output_imageChangeSuccess.emit(false);
  }

  public async save()
  {
    this.rerenderImage = false;
    this.loading = true;
    let toast;
    try {
      let newRec = await this.recipeService.updateImage(this.recipe.id, this.newImage);
      this.imagePath = newRec.imagePath;
      toast = await this.toastControler.create({
        message: `Bild wurde geändert.`,
        duration: 3000,
        position: 'top',
        color: 'success'
      });
      this.imageEditMode = false;
    }
    catch (error) {
      console.log(error);
      let err = error as ApiError;
      toast = await this.toastControler.create({
        message: err.message,
        duration: 3000,
        position: 'top',
        color: 'danger'
      });
      this.loading = false;
    }
    await toast.present();
    this.loading = false;
    this.rerenderImage = true;
  }

  public async delete()
  {
    this.loading = true;
    let toast;
    try {
      await this.recipeService.deleteImage(this.recipe.id);
      toast = await this.toastControler.create({
        message: `Bild wurde gelöscht.`,
        duration: 3000,
        position: 'top',
        color: 'success'
      });
      this.imageEditMode = false;
      this.rerenderImage = false;
      this.ngOnInit();
    }
    catch (error) {
      console.log(error);
      let err = error as ApiError;
      toast = await this.toastControler.create({
        message: err.message,
        duration: 3000,
        position: 'top',
        color: 'danger'
      });
      this.loading = false;
    }
    await toast.present();
    this.loading = false;
  }
}
