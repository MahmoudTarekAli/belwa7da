import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-close-dialog-button',
  templateUrl: './close-dialog-button.component.html',
  styleUrls: ['./close-dialog-button.component.scss']
})
export class CloseDialogButtonComponent implements OnInit {
  @Input() name;
  @Input() loading;
  @Input() isDisabled;
  @Input() isResend;

  @Output() isClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleIsClicked() {
    this.isClicked.emit();
  }

}
