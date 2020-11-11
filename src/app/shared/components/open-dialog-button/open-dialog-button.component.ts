import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-open-dialog-button',
  templateUrl: './open-dialog-button.component.html',
  styleUrls: ['./open-dialog-button.component.scss']
})
export class OpenDialogButtonComponent implements OnInit {
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
