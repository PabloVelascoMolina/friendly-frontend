import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(avatar: string, imageType: number) {
    if (!avatar && imageType == 0) {
      return 'assets/img/no-photo.png';
    } else if (!avatar && imageType == 1) {
      return 'assets/img/unnamed.jpg';
    }

    if (avatar.length > 0) {
      return avatar;
    } else if (imageType == 0) {
      return 'assets/img/no-photo.png';
    } else if (imageType == 1) {
      return 'assets/img/unnamed.jpg';
    }
  }

}
