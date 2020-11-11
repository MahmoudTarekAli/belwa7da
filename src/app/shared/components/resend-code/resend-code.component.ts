import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resend-code',
  templateUrl: './resend-code.component.html',
  styleUrls: ['./resend-code.component.scss']
})
export class ResendCodeComponent implements OnInit {

  @Input() name;
  @Input() loading;
  @Input() isResend;

  @Output() isClickedResend = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleIsClicked() {
    this.isClickedResend.emit();
  }


}
