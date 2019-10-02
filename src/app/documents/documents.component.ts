import { Component, OnInit, Input } from '@angular/core';
import { Animations } from './documents.animations';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  animations: [ Animations.fade ]
})

export class DocumentsComponent implements OnInit {
  
  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
  
}