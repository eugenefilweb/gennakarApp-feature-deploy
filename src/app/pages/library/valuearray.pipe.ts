import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valuearray'
})
export class ValuearrayPipe implements PipeTransform {

  transform = (objects: any = []) => {
    return Object.values(objects);
  }

}
