import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../document.model';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html'
})
export class DocumentItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  ngOnInit() {
  }
}
