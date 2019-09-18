import { Component, OnInit } from '@angular/core';
import { Animations } from './documents.animations';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
   animations: [ Animations.fade ]
})
export class DocumentsComponent implements OnInit {

  state = 'normal';
  constructor() { }

  ngOnInit() {
  }

  animateParent() {
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
  }

}