import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  RandomPeopleLoading: boolean;
  images = []

  constructor(private userService: UserService) {
    this.GetRandomPeople();
  }

  ngOnInit(): void {

  }

  GetRandomPeople() {
      this.RandomPeopleLoading = true;
      this.userService.getUsersRandom().subscribe((data: any) => {
        this.RandomPeopleLoading = false;
        data.forEach((user: any) => {
          this.images.push({ "path": user.avatar, "name": user.name, "id": user.id });

        });
      })
  }

  handleCarouselEvents(i) {
    console.log(i.path);
  }


}
