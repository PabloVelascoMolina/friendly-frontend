import { Component, OnInit, Input, Output, EventEmitter, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PostsService } from '../../../../_services/posts.service';
import { NotificationService } from '../../../../_services/notification.service';
import { NotificationType } from '../../../../_models/notification';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OptionsComponent),
  multi: true
};

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class OptionsComponent implements OnInit, ControlValueAccessor {

  @Input() id: number;
  @Input() options: Array<any>;
  @Input() selected: number;
  @Input() className: string;
  @Input() placeholder: string;
  @Input() isReadOnly = false;
  @Output() optSelect = new EventEmitter();
  isOpen = false;
  modalDelete = false;
  selectedOption;


  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  isSelectedValue: boolean;
  key: string;
  isFocused: boolean;

  constructor(private _postService: PostsService, private _notificationService: NotificationService, private router: Router) {}


  ngOnInit() {
    if (this.selected) {
      this.placeholder = '';
      this.isOpen = false;
    }
  }

  @HostListener('focus')
  focusHandler() {
    this.selected = 0;
    this.isFocused = true;
  }

  @HostListener('focusout')
  focusOutHandler() {
    this.isFocused = false;
  }

  @HostListener('document:keydown', ['$event'])
  keyPressHandle(event: KeyboardEvent) {

    if (this.isFocused) {
      this.key = event.code;
      switch (this.key) {
        case 'Space':
          this.isOpen = true;
          break;
        case 'ArrowDown':
          if (this.options.length - 1 > this.selected) {
            this.selected = this.selected + 1;
          }
          break;
        case 'ArrowUp':
          if (this.selected > 0) {
            this.selected = this.selected - 1;
          }
          break;
        case 'Enter':
          if (this.selected > 0) {
            this.isSelectedValue = true;
            this.isOpen = false;
            this.onChangeCallback(this.selected);
            this.optSelect.emit(this.options[this.selected]);
          }
          break;
      }
    }

  }

  optionSelect(selectedOption: string, idx, e: any) {
    e.stopPropagation();
    this.selected = idx;
    this.isSelectedValue = true;
    this.isOpen = false;
    this.onChangeCallback(this.selected);
    this.optSelect.emit(selectedOption);
    let option_str = JSON.stringify(selectedOption);
    let options = JSON.parse(option_str);
    if (options.id == 3) {
      this.modalDelete = true;
    }
  }

  toggle(e: any) {
    e.stopPropagation();
    const allElems = document.querySelectorAll('.dropdown-wrapper');
    for (let i = 0; i < allElems.length; i++) {
      allElems[i].classList.remove('is-open');
    }
    this.isOpen = !this.isOpen;
    if (this.selected >= 0) {
      document.querySelector('#li' + this.selected).scrollIntoView(true);
    }
  }

  @HostListener('document: click', ['$event'])
  onClick() {
    this.isOpen = false;
  }

  writeValue(obj: any): void {
    if (obj && obj !== '') {
      this.isSelectedValue = true;
      this.selected = obj;
    } else {
      this.isSelectedValue = false;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }

  deletePost() {
    this._postService.getDeletePost(this.id).subscribe((data) => {
      this.modalDelete = false;
      this.onRefresh();
      this._notificationService.sendMessage({
        message: 'Has eliminado una publicación.',
        type: NotificationType.warning,
      });
    });
  }

  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };

    let currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }
}
