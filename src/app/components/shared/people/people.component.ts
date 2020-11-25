import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  RandomPeople: any[] = [];
  RandomPeopleLoading: boolean;

  constructor(private userService: UserService) {
    this.GetRandomPeople();
  }

  ngOnInit(): void {
  }

  GetRandomPeople() {
      this.RandomPeopleLoading = true;
      this.userService.getUsersRandom().subscribe((data) => {
        this.RandomPeople = data;
        this.RandomPeopleLoading = false;
      })
  }
}
