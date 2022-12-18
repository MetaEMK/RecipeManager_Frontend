import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-general-remove-modal',
  templateUrl: './general-remove-modal.component.html',
  styleUrls: ['./general-remove-modal.component.css']
})
export class GeneralRemoveModalComponent {

  constructor(
    public modalController: ModalController
  ) { }

  //Inputed values from parent via ModalController
  public title?: string;
  public name?: string;
  public description?: string;
  public confirmationText?: string;

  public onCancel() {
    this.modalController.dismiss(false);
  }

  public onConfirm() {
    this.modalController.dismiss(true);
  }

}
