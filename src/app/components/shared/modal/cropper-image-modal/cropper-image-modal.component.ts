import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper-image-modal',
  templateUrl: './cropper-image-modal.component.html',
  styleUrls: ['./cropper-image-modal.component.scss']
})
export class CropperImageModalComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  @ViewChild('CreateCropperModal', { static: false }) modal: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }

}
