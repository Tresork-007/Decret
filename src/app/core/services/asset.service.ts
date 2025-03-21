import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  // Utiliser des chemins relatifs sans slash initial
  private basePath = 'assets/images/';

  constructor() { }

  getImagePath(imageName: string): string {
    return this.basePath + imageName;
  }
}
