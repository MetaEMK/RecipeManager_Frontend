import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {

  constructor() { }

  public color: string = 'dark';
  public mode: string = 'ios';
}
