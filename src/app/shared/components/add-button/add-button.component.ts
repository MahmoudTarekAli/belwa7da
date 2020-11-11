import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {

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
