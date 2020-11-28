import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../_services/user.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {

  constructor(private userService: UserService) { }

  transform(id: number): any {
    return this.userService.getUserProfile(id).pipe(map((user: any) => user.name));
  }

}
