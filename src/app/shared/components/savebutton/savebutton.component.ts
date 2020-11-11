import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-savebutton',
  templateUrl: './savebutton.component.html',
  styleUrls: ['./savebutton.component.scss']
})
export class SavebuttonComponent implements OnInit {
  @Input() name;
  @Input() loading;

  @Output() isClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleIsClicked() {
    this.isClicked.emit();
  }



}
