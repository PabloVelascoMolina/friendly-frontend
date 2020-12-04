import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('CreatePostModal', { static: false }) modal: ElementRef;

  constructor() { }

  ngOnInit(): void {
    let ini = document.querySelector('.create-modal');
    ini.classList.add("hideModal");

  }

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
    let m = document.querySelector('.create-modal');
    m.classList.remove("showModal");
  }

}
