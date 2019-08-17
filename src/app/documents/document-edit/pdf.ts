 import { Input } from '@angular/core'
import { Document } from '../document.model';

export class Pdf {
  @Input() document: Document;

  docDefinition = {
    content: [{
        text: 'nope',
        style: 'header'
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true
      },
      bigger: {
        fontSize: 15,
        italics: true
      }
    }
  };
  // getSomething() {
  //   console.log( document );
  // }
  //    this.docDefinition = {
  //     content: [
  //       {
  //         text: x,
  //         style: 'header'
  //       },
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true
  //       },
  //       bigger: {
  //         fontSize: 15,
  //         italics: true
  //       }
  //     }
  //   };
  // }
}