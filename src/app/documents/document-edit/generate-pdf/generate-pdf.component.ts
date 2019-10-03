import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

import { logo } from './logo';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html'
})
export class GeneratePdfComponent implements OnInit {
  @Input() pdfData;
  @Input() images;
  @Output() pdfGen = new EventEmitter<any>();
  // (pdfGen)="pdfGen($event)"
  subtotalPrice;
  tax;
  totalPrice;
  halfPrice;
  types = ['Estimate', 'Contract', 'Invoice'];
  typeForm: FormGroup;
  
  estimate: any = [];
  contract: any = [];
  invoice: any = [];
  
  imageArray: any = [];

  constructor( private location: Location, private router: Router ) { }

  ngOnInit() {
    this.typeForm = new FormGroup({
      'type': new FormControl('Estimate')
    });
    // this.getDataUri(this.pdfData.things[0].aden, (dataUri: string) => {
    //   this.imageOne = dataUri;
    // });
   
    this.pdfData.things.forEach(image => {
      this.getDataUri(image.aden, (dataUri: string) => {
        this.imageArray.push(dataUri);
      });
    });
  }

  goBack() {
    event.preventDefault();
    // this.location.back();
    this.router.navigate(['/documents']);
  }

  getDataUri = (url: string, callback: Function) => {
    const image = new Image();
    image.onload = function() {
        let canvas = document.createElement('canvas');
        canvas.width = (this as any).naturalWidth;
        canvas.height = (this as any).naturalHeight;
        if (canvas) {
          const context = canvas.getContext('2d');
          if (context) {
            context.drawImage((this as any), 0, 0);
          }
          callback(canvas.toDataURL('image/png'));
        }
    };
    image.src = url;
  }

  newGeneratePdf($value) {
    event.preventDefault();
    // var tagOne, imageOne, spacer, tagTwo, imageTwo;
    // this.images.forEach((image, index) => {
    //   tagOne = {text: 'Image ' + JSON.stringify(index + 1), alignment: 'center', pageBreak: 'before'};
    //   imageOne = {image: image, alignment: 'center', fit: [500, 340],};
    //   spacer = {text: ' '};
    // });
    if (this.images[0]) {
      var tagOne = {text: 'Image 1', alignment: 'center', pageBreak: 'before'};
      var imageOne = {image: this.images[0], alignment: 'center', fit: [500, 340],};
      var spacer = {text: ' '};
    }
    if (this.images[1]) {
      var tagTwo = {text: 'Image 2', alignment: 'center'};
      var imageTwo = {image: this.images[1], alignment: 'center', fit: [500, 340],};
    }
    function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    
    this.subtotalPrice = '$' + formatNumber(this.pdfData.price.toFixed(2));
   
    if (this.pdfData.tax) {
      this.tax = '-';
      this.totalPrice = this.subtotalPrice;
      this.halfPrice = '$' + formatNumber(((this.pdfData.price)/2).toFixed(2));
    } else {
      this.tax = '$' + formatNumber((this.pdfData.price * 0.06625).toFixed(2)); 
      this.totalPrice = '$' + formatNumber((this.pdfData.price + this.pdfData.price * 0.06625).toFixed(2));
      this.halfPrice = '$' + formatNumber(((this.pdfData.price+ this.pdfData.price * 0.06625).toFixed(2)/2));
    }

    this.estimate = {
      content: [{image:logo.data, width: 200, margin: [0, 50, 0, 0]}, 
      {text: 'Estimate', bold: true, margin: [390, -60, 0, 0], alignment: 'center', fontSize: 24},
      { bold: true, alignment: 'right', margin: [390, 0, 0, -80], stack: [{alignment: 'center', table: { body: [
        [{text: 'Date', style: 'tableHeader'}, {text: 'Estimate #', style: 'tableHeader'}],
        [ this.pdfData.date, this.pdfData.number]
      ]}}]},
      { alignment: 'center', margin: [0, 100, 0, 0], stack: [{ table: { widths: ['*', '*'], body: [
        [{text: 'SERVICE PROVIDER', style: 'tableHeader'}, {text: 'CUSTOMER', style: 'tableHeader'}],
        [ {type: 'none', style: 'tableBody', ul: [
          'Jecche Steel • Glass • Aluminum LLC',
          '829 Broadway Avenue',
          'Newark, NJ 07104',
          'Phone: (862) 234-1559 Cell: (973) 368-3248',
          'Email: jecchellc@yahoo.com',
          'Web: www.jecche.com'
          ]}, {type: 'none',  style: 'tableBody', ul: [
            this.pdfData.customer
        ]}]]}}]},
      {fontSize: 10, alignment: 'left', margin: [0, 10, 0, 0], table: { widths: ['*', '*', '*', '*'], body: [
        [{text: 'SUMMARY OF SERVICES', style: 'tableHeader', colSpan: 4}, {}, {}, {}],
        [{ul: [
          {text: 'General Welding', listType: this.pdfData.services.generalWelding ? 'dot' : 'circle'},
          {text: 'General Repair', listType:  this.pdfData.services.generalRepair ? 'dot' : 'circle'},
          {text: 'Basement Door', listType:  this.pdfData.services.basementDoor ? 'dot' : 'circle'},
        ]}, {ul: [
          {text: 'Fire Escapes', listType: this.pdfData.services.fireEscapes ? 'dot' : 'circle'},
          {text: 'Awnings', listType:  this.pdfData.services.awnings ? 'dot' : 'circle'},
          {text: 'Railings', listType:  this.pdfData.services.railings ? 'dot' : 'circle'}
        ]}, {ul: [
          {text: 'Fences', listType:  this.pdfData.services.fences ? 'dot' : 'circle'},
          {text: 'Stairs', listType:  this.pdfData.services.stairs ? 'dot' : 'circle'},
          {text: 'Gates', listType:  this.pdfData.services.gates ? 'dot' : 'circle'}
        ]}, {ul: [
          {text: 'Security Door', listType:  this.pdfData.services.securityDoor ? 'dot' : 'circle'},
          {text: 'Window Guards', listType:  this.pdfData.services.windowGuards ? 'dot' : 'circle'},
          {text: 'Other Services', listType:  this.pdfData.services.otherServices ? 'dot' : 'circle'}
      ]}]]}},
      {alignment: 'left', margin: [0, 10, 0, 0], table: { heights: ['', 220, 30, 30, 30], widths: [250, 120, '*'], body: [
      [{text: 'DESCRIPTION', style: 'tableHeader'}, {text: 'WORKSITE', style: 'tableHeader'}, {text: 'TOTAL', style: 'tableHeader'}],
      [{ type: 'none', ul: [
              {text: 'Service of:', margin: [0, 0, 0, 10], },
              {text:  this.pdfData.description, style: 'tableBody'},
              {text: this.pdfData.note, fontSize: 8, margin: [0, 40, 0, 0], },
            ]},
            {text: this.pdfData.worksite, alignment: 'center', fontSize: 10}, { type: 'none', ul: [
          {text: this.subtotalPrice, style: 'price'},
        ]}],
        [{border: [false, false, false, false], text: ''},
          {text: 'Subotal', style: 'price'},
          {type: 'none', ul: [
          {text: this.subtotalPrice, style: 'price'},
        ]}],
      [{border: [false, false, false, false], fontSize: 9, bold: true, text: 'Address for payments by check and other documents:'},
          {text: 'Tax 6.625%', style: 'price'},
          { type: 'none', ul: [
          {text: this.tax, style: 'price'},
        ]}],
      [{border: [false, false, false, false], fontSize: 12, bold: true, text: '14 Parkside Dr, Apt 2, Belleville NJ 07109'},
      {text: 'Total', style: 'price'},
      {type: 'none', ul: [
      {text:  this.totalPrice, style: 'price'},
      ]}]]}},
      {margin: [0, 30, 0, 0], table: { widths: ['*'], body: [
        [{text: 'NOTE',  style: 'tableHeader'}],
        [{text: 'This proposal is valid for 15 days following the date above. Estimated completion date is within 2 to 3 weeks from the date the contract is signed (possibility of delay due to unforeseen circumstances and interferences). A down payment is required when signing the contract (maximum of 3 days for a late payment if not given at signing). Down payment will be 50% of the total price and is non-refundable. The remaining 50% must be given once the service is complete. Any unforeseen or unnegotiated addition of work will be documented and may increase the total price. Please note that all items ordered in iron will rust.', fontSize: 7, alignment: 'center' }]]}},
        tagOne,
        imageOne,
        spacer,
        tagTwo,
        imageTwo
      ],
      styles: {
        tableHeader: {fillColor: '#dddddd', alignment: 'center', fontSize: 10, bold: true },
        tableBody: { fontSize: 10 },
        price: { bold: true, alignment: 'center', margin: [-10, 6, 0, 0] },
      }
    };

    this.contract = {
      content: [{image:logo.data, width: 200, margin: [0, 50, 0, 0]}, 
        {text: 'Contract', style: 'document'},
        { style: 'tableNumber', stack: [{ style: 'date', table: { body: [
        [{text: 'Date', style: 'tableHeader'}, 
        {text: 'Contract #', style: 'tableHeader'}],
        [this.pdfData.date, this.pdfData.number]
      ]}}]},
      { style: 'customer', stack: [{ style: 'table2', table: { widths: ['*', '*'], body: [
        [{text: 'SERVICE PROVIDER', style: 'tableHeader'}, {text: 'CUSTOMER', style: 'tableHeader'}],
        [ {type: 'none', style: 'tableBody', ul: [
          'Jecche Steel • Glass • Aluminum LLC',
          '829 Broadway Avenue',
          'Newark, NJ 07104',
          'Phone: (862) 234-1559 Cell: (973) 368-3248',
          'Email: jecchellc@yahoo.com',
          'Web: www.jecche.com',
          ]}, {type: 'none',  style: 'tableBody', ul: [
            this.pdfData.customer
        ]}]]}}]},
      {style: 'tableServices', table: { widths: ['*', '*', '*', '*'], body: [
        [{text: 'SUMMARY OF SERVICES', style: 'tableHeader', colSpan: 4}, {}, {}, {}],
        [{ul: [
          {text: 'General Welding', listType: this.pdfData.services.generalWelding ? 'dot' : 'circle'},
          {text: 'General Repair', listType:  this.pdfData.services.generalRepair ? 'dot' : 'circle'},
          {text: 'Basement Door', listType:  this.pdfData.services.basementDoor ? 'dot' : 'circle'},
        ]}, {ul: [
          {text: 'Fire Escapes', listType: this.pdfData.services.fireEscapes ? 'dot' : 'circle'},
          {text: 'Awnings', listType:  this.pdfData.services.awnings ? 'dot' : 'circle'},
          {text: 'Railings', listType:  this.pdfData.services.railings ? 'dot' : 'circle'}
        ]}, {ul: [
          {text: 'Fences', listType:  this.pdfData.services.fences ? 'dot' : 'circle'},
          {text: 'Stairs', listType:  this.pdfData.services.stairs ? 'dot' : 'circle'},
          {text: 'Gates', listType:  this.pdfData.services.gates ? 'dot' : 'circle'}
        ]}, {ul: [
          {text: 'Security Door', listType:  this.pdfData.services.securityDoor ? 'dot' : 'circle'},
          {text: 'Window Guards', listType:  this.pdfData.services.windowGuards ? 'dot' : 'circle'},
          {text: 'Other Services', listType:  this.pdfData.services.otherServices ? 'dot' : 'circle'}
      ]}]]}},
      {text: 'SERVICE AGREEMENT', style: 'header' },
      {text: '1. DESCRIPTION OF SERVICES. Beginning on upon agreement to this contract Jecche Steel Glass & Aluminum LLC will provide to ' + this.pdfData.attn + ' the following services:', style: 'paragraph' },
      { stack: [{ table: { heights: [0, 100], body: [
        [{text: 'Service of:', fontSize: 10, border: [false, false, false, false]}],
        [{text: this.pdfData.description, style: 'tableBody', margin: [0, 0, 0, 5], border: [false, false, false, false]}]
      ]}}]},
      {type: 'none',  style: 'tableBody', ul: [
        {text: 'Worksite: ' + this.pdfData.worksite, fontSize: 8, margin: [0, 10, 0, 0] },
        {text: this.pdfData.note, fontSize: 8, margin: [0, 10, 0, 0], },
        {text: 'Address for payments by check and other documents:', fontSize: 8, bold: true, margin: [0, 10, 0, 0], },
        {text: '14 Parkside Dr, Apt 2, Belleville NJ 07109', fontSize: 12, bold: true, margin: [0, 10, 0, 0], },
      ]},
      {text: '2. PAYMENT FOR SERVICES. In exchange for the services ' + this.pdfData.attn + ' will pay Jecche Steel, Glass & Aluminum LLC according to the following schedule:', style: 'paragraph' },
      {stack: [{ table: { widths: [400, '*'],  body: [
        [{text: 'Subtotal', fontSize: 10}, {text: this.subtotalPrice, fontSize: 10, alignment: 'center'}],
        [{text: 'Tax 6.625%', fontSize: 10}, {text: this.tax, fontSize: 10, alignment: 'center'}],
        [{text: 'Total', fontSize: 10}, {text: this.totalPrice, fontSize: 10, alignment: 'center'}],
        [{text: '1st Payment (Non Refundable Down Payment due at signing of the contract)', fontSize: 10}, {text: this.halfPrice, fontSize: 10, alignment: 'center'}],
        [{text: '2nd Payment (Remainder of amount upon completion)', fontSize: 10}, {text: this.halfPrice, fontSize: 10, alignment: 'center'}]
      ]}}]},
      {text: '                              ', margin: [0, 40, 0, 0]},
      {text: '3. TERM. This Contract takes effect immediately as of the Signed Date, and will terminate automatically upon completion by Jecche Steel, Glass & Aluminum LLC of the Services required by this Contract.', margin: [0, 10, 0, 0] },
      {text: '4. WORK PRODUCT OWNERSHIP. Any copyrightable works, ideas, inventions, products, or other information developed in whole or in part by Jecche Steel, Glass & Aluminum LLC in connection with the Services will be the exclusive property of Jecche Steel, Glass & Aluminum LLC. ', style: 'paragraph' },
      {text: '5. REMEDIES. If a party defaults by failing to substantially perform any provision, term or condition of this Contract (including without limitation the failure to make a monetary payment when due), the other party may terminate the Contract by providing written notice to the defaulting party. This notice shall describe with sufficient detail the nature of the default. The party receiving such notice shall have 30 days from the effective date of such notice to cure the default(s). Unless waived by a party providing notice, the failure to cure the default(s) within such time period shall result in the automatic termination of this Contract.', style: 'paragraph' },
      {text: '6. ENTIRE AGREEMENT. This Contract contains the entire agreement of the parties, and there are no other promises or conditions in any other agreement whether oral or written concerning the subject matter of this Contract. This Contract supersedes any prior written or oral agreements between the parties.', style: 'paragraph' },
      {text: '7. WARRANTY. Jecche Steel, Glass & Aluminum LLC warrants its products and services to be free from manufacturing defects in material and workmanship to the original consumer purchaser for a period of 1 year from the date of installation. Please note, gate operators and other access control systems and accessories are supplied with original manufacturer’s warranties. During the first year, defects in these components will be repaired without charge to the customer.', style: 'paragraph' },
      {text: 'This warranty does not cover damage caused by abnormal or improper use, improper product application, accident, alteration, welding, neglect, abuse, lawn care equipment or vehicle damage, abrasion, harsh chemicals, pool chemicals or chemicals for ice removal, air pollutants, lack of maintenance, or damage cause by flood, fire or acts of God. The original consumer must contact Jecche Steel, Glass & Aluminum LLC via email at jecchellc@yahoo.com to obtain necessary warranty claim forms and start a claim process.  The original consumer purchaser will be notified by Jecche Steel, Glass & Aluminum LLC as to whether the warranty claim is approved or denied.  PROOF OF PURCHASE AND FULL PAYMENT TO JECCHE STEEL, GLASS AND ALUMINUM LLC FOR SERVICE RENDERED OR MATERIALS PROVIDED MUST ACCOMPANY ALL WARRANTY CLAIMS.', style: 'paragraph', margin: [0, 0, 0, 100] },
      { stack: [{ table: {widths: ['*', '*'], body: [
        [ {border: [false, false, false, false], type: 'none', style: 'tableBody', ul: [
          {text: 'Jecche Steel, Glass & Aluminum LLC', margin: [0, 0, 0, 30], bold: true},
          {text: 'Name: Carlos Chafloque', margin: [0, 0, 0, 30]},
          {text: 'Signature: ____________________________________'},
        ]}, {border: [false, false, false, false], type: 'none',  style: 'tableBody', ul: [
          {text: 'Service Recipient:', margin: [0, 0, 0, 30], bold: true},
          {text: 'Name: ______________________________________', margin: [0, 0, 0, 39]},
          {text: 'Signature: ___________________________________'},
        ]}]
      ]}}]},
      ],
      styles: {
        header: {alignment: 'center', bold: true, fontSize: 16, margin: [0, 30, 0, 20]},
        paragraph: {fontSize: 10, margin: [0, 10, 0, 10]},
        logo: { margin: [0, 50, 0, 0] },
        document: { bold: true, margin: [390, -60, 0, 0], alignment: 'center', fontSize: 24 },
        tableNumber: { bold: true, alignment: 'right', margin: [390, 0, 0, -80] },
        tableHeader: {fillColor: '#dddddd', alignment: 'center', fontSize: 10, bold: true },
        tableBody: { fontSize: 10 },
        customer: { alignment: 'center', margin: [0, 100, 0, 0] },
        tableServices: { fontSize: 10, alignment: 'left', margin: [0, 10, 0, 0]},
      }
    };

    this.invoice = {
      content: [{image:logo.data, width: 200, margin: [0, 50, 0, 0]}, {text: 'Invoice', bold: true, margin: [390, -60, 0, 0], alignment: 'center', fontSize: 24},
      { bold: true, alignment: 'right', margin: [390, 0, 0, -80], stack: [{alignment: 'center', table: { body: [
        [{text: 'Date', style: 'tableHeader'}, {text: 'Invoice #', style: 'tableHeader'}],
        [this.pdfData.date, this.pdfData.number]
      ]}}]},
      { alignment: 'center', margin: [0, 100, 0, 0], stack: [{ table: { widths: ['*', '*'], body: [
        [{text: 'SERVICE PROVIDER', style: 'tableHeader'}, {text: 'CUSTOMER', style: 'tableHeader'}],
        [ {type: 'none', style: 'tableBody', ul: [
          'Jecche Steel • Glass • Aluminum LLC',
          '829 Broadway Avenue',
          'Newark, NJ 07104',
          'Phone: (862) 234-1559 Cell: (973) 368-3248',
          'Email: jecchellc@yahoo.com',
          'Web: www.jecche.com'
          ]}, {type: 'none',  style: 'tableBody', ul: [
            this.pdfData.customer
        ]}]]}}]},
      {fontSize: 10, alignment: 'left', margin: [0, 10, 0, 0], table: { widths: ['*', '*', '*', '*'], body: [
        [{text: 'SUMMARY OF SERVICES', style: 'tableHeader', colSpan: 4}, {}, {}, {}],
        [{ul: [
          {text: 'General Welding', listType: this.pdfData.services.generalWelding ? 'dot' : 'circle'},
          {text: 'General Repair', listType:  this.pdfData.services.generalRepair ? 'dot' : 'circle'},
          {text: 'Basement Door', listType:  this.pdfData.services.basementDoor ? 'dot' : 'circle'},
        ]}, {ul: [
          {text: 'Fire Escapes', listType: this.pdfData.services.fireEscapes ? 'dot' : 'circle'},
          {text: 'Awnings', listType:  this.pdfData.services.awnings ? 'dot' : 'circle'},
          {text: 'Railings', listType:  this.pdfData.services.railings ? 'dot' : 'circle'}
        ]}, {ul: [
          {text: 'Fences', listType:  this.pdfData.services.fences ? 'dot' : 'circle'},
          {text: 'Stairs', listType:  this.pdfData.services.stairs ? 'dot' : 'circle'},
          {text: 'Gates', listType:  this.pdfData.services.gates ? 'dot' : 'circle'}
        ]}, {ul: [
          {text: 'Security Door', listType:  this.pdfData.services.securityDoor ? 'dot' : 'circle'},
          {text: 'Window Guards', listType:  this.pdfData.services.windowGuards ? 'dot' : 'circle'},
          {text: 'Other Services', listType:  this.pdfData.services.otherServices ? 'dot' : 'circle'}
      ]}]]}},
      {alignment: 'left', margin: [0, 10, 0, 0], table: { heights: ['', 220, 30, 30, 30], widths: [250, 120, '*'], body: [
      [{text: 'DESCRIPTION', style: 'tableHeader'}, {text: 'WORKSITE', style: 'tableHeader'}, {text: 'TOTAL', style: 'tableHeader'}],
      [{ type: 'none', ul: [
              {text: 'Service of:', margin: [0, 0, 0, 10], },
              {text: this.pdfData.description, style: 'tableBody'},
              {text: this.pdfData.note, fontSize: 8, margin: [0, 40, 0, 0], },
            ]},
            {text: this.pdfData.worksite, alignment: 'center', fontSize: 10}, { type: 'none', ul: [
          {text: this.subtotalPrice, style: 'price'},
        ]}],
        [{border: [false, false, false, false], text: ''},
          {text: 'Subotal', style: 'price'},
          { type: 'none', ul: [
          {text: this.subtotalPrice, style: 'price'},
        ]}],
      [{border: [false, false, false, false], fontSize: 10, text: 'Address for payments by check and other documents:'},
          {text: 'Tax 6.625%', style: 'price'},
          { type: 'none', ul: [
          {text: this.tax, style: 'price'},
        ]}],
      [{border: [false, false, false, false], fontSize: 10, bold: true, text: '14 Parkside Dr, Apt 2, Belleville NJ 07109'},
      {text: 'Total', style: 'price'},
      {type: 'none', ul: [
      {text: this.totalPrice, style: 'price'},
      ]}]]}},
      tagOne,
      imageOne,
      spacer,
      tagTwo,
      imageTwo
      ],
      styles: {
        tableHeader: {fillColor: '#dddddd', alignment: 'center', fontSize: 10, bold: true },
        tableBody: { fontSize: 10 },
        price: { bold: true, alignment: 'center', margin: [-10, 6, 0, 0] },
      }
    }
    
    switch($value) {
      case 'estimate':
        pdfMake.createPdf( this.estimate ).open();
        break;
      case 'contract':
        pdfMake.createPdf( this.contract ).open();
        break;
      case 'invoice':
        pdfMake.createPdf( this.invoice ).open();
        break;
      default:
        alert('Something went wrong!');
    }
  }

 

}
