import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dontput',
  pure: false
})
export class DontputPipe implements PipeTransform {

  transform(items: any[]): any {
    //return items.filter(item => item.name !== -1);
  }

}
