import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  animations: [
    trigger(
      'gamesSkeletonAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms', style({ opacity: 0 }))
      ])
    ]
    ),
  ],
})
export class PlanComponent implements OnInit {

  PlanLoading: boolean;

  constructor() {
    setTimeout(() => {
      this.PlanLoading = false;
    }, 3500);
  }

  ngOnInit(): void {

  }

}
