import { Injectable } from '@angular/core';
import { TreeService } from '../services/tree.service';

@Injectable({
  providedIn: 'root'
})
export class TreeValidatedResolver {
  constructor( private treeService: TreeService){}

  resolve() {
    return this.treeService.getTreesDataValidation();
  }
}
