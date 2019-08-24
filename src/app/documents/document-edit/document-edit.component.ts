import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DocumentService } from '../document.service';

import { DataStorageService } from '../../shared/data-storage.service';

import { Customer } from '../../shared/customer.model';
import { CustomerListService } from '../../customer-list/customer-list.service';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { ok } from 'assert';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html' 
})
export class DocumentEditComponent implements OnInit {
  types = ['Estimate', 'Contract', 'Invoice'];
  typeForm: FormGroup;

  id: number;
  editMode = false;
  documentForm: FormGroup;
  items: Customer[];
  private subscription: Subscription;

  logo: any = [];
  estimate: any = [];
  contract: any = [];
  invoice: any = [];
  
  subtotalPrice: string;
  tax: string;
  halfPrice: string;
  totalPrice: string;

  services = [
    {name: 'generalWelding', value: false},
    {name: 'fireEscapes', value: false},
    {name: 'fences', value: false},
    {name: 'securityDoor', value: false},
    
    {name: 'generalRepair', value: false},
    {name: 'awnings', value: false},
    {name: 'stairs', value: false},
    {name: 'windowGuards', value: false},


    {name: 'basementDoor', value: false},
    {name: 'railings', value: false},
    {name: 'gates', value: false},
    {name: 'otherServices', value: false},
  ];

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private customerListService: CustomerListService, 
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      this.dataStorageService.fetchCustomers().subscribe();
      this.subscription = this.customerListService.itemsChanged.subscribe(
        (items: Customer[]) => {
          this.items = items;
        }
      );
    });
    this.typeForm = new FormGroup({
      'type': new FormControl('Estimate')
    });
  }

  onSubmit() {
    this.items.forEach(element => {
      if (element.attn === this.documentForm.value.attn){
        this.documentForm.value.customer = element.customer;
      }
    });

    if (this.editMode) {
      this.documentService.updateDocument(this.id, this.documentForm.value);
    } else {
      this.documentService.addDocument(this.documentForm.value);
    }
    this.dataStorageService.storeDocuments();
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDelete() {
    this.documentService.deleteDocument(this.documentForm.value);
    this.dataStorageService.storeDocuments();
  }
  onAddThing() {
    (<FormArray>this.documentForm.get('things')).push(
      new FormGroup({ aden: new FormControl(null, Validators.required) })
    );
  }
  onDeleteThing(index: number) {
    (<FormArray>this.documentForm.get('things')).removeAt(index);
  }

  private initForm() {
    let documentNumber = '';
    let documentDate = '';
    let documentAttn = '';
    let documentCustomer = '';
    let documentWorksite = '';
    let documentGeneralWelding = false;
    let documentGeneralRepair = false;
    let documentBasementDoor = false;
    let documentFireEscapes = false;
    let documentAwnings = false;
    let documentRailings = false;
    let documentFences = false;
    let documentStairs = false;
    let documentGates = false;
    let documentSecurityDoor = false;
    let documentWindowGuards = false;
    let documentOtherServices = false;
    let documentDescription = '';
    let documentNote = 'Estimate time for project completion 4 to 6 weeks';
    let documentPrice = 0;
    let documentTax = false;

    let documentThings = new FormArray([]);

    if (this.editMode) {
      const document = this.documentService.getDocument(this.id);
      documentNumber = document.number;
      documentDate = document.date;
      documentAttn = document.attn;
      documentCustomer = document.customer;
      documentWorksite = document.worksite;
      documentGeneralWelding = document.services.generalWelding;
      documentGeneralRepair = document.services.generalRepair;
      documentBasementDoor = document.services.basementDoor;
      documentFireEscapes = document.services.fireEscapes;
      documentAwnings = document.services.awnings;
      documentRailings = document.services.railings;
      documentFences = document.services.fences;
      documentStairs = document.services.stairs;
      documentGates = document.services.gates;
      documentSecurityDoor = document.services.securityDoor;
      documentWindowGuards = document.services.windowGuards;
      documentOtherServices = document.services.otherServices;
      documentDescription = document.description;
      documentNote = document.note;
      documentPrice = document.price;
      documentTax = document.tax;

      if (document['things']) {
        for (let thing of document.things) {
          documentThings.push( new FormGroup({ aden: new FormControl(thing.aden, Validators.required)}) );
        }
      }

    }

    this.documentForm = new FormGroup({
      number: new FormControl(documentNumber, Validators.required),
      date: new FormControl(documentDate, Validators.required),
      attn: new FormControl(documentAttn, Validators.required),
      customer: new FormControl(documentCustomer, Validators.required),
      worksite: new FormControl(documentWorksite, Validators.required),

      services: new FormGroup({
        generalWelding: new FormControl(documentGeneralWelding, Validators.required),
        generalRepair: new FormControl(documentGeneralRepair, Validators.required),
        basementDoor: new FormControl(documentBasementDoor, Validators.required),
        fireEscapes: new FormControl(documentFireEscapes, Validators.required),
        awnings: new FormControl(documentAwnings, Validators.required),
        railings: new FormControl(documentRailings, Validators.required),
        fences: new FormControl(documentFences, Validators.required),
        stairs: new FormControl(documentStairs, Validators.required),
        gates: new FormControl(documentGates, Validators.required),
        securityDoor: new FormControl(documentSecurityDoor, Validators.required),
        windowGuards: new FormControl(documentWindowGuards, Validators.required),
        otherServices: new FormControl(documentOtherServices, Validators.required),
      }),
       

      description: new FormControl(documentDescription, Validators.required),
      note: new FormControl(documentNote, Validators.required),
      price: new FormControl(documentPrice, Validators.required),
      tax: new FormControl(documentTax, Validators.required),

      things: documentThings
    });

   
    
  }

  generatePdf() {
    const services = [
      {name: 'generalWelding', value: 'circle'},
      {name: 'generalRepair', value: 'circle'},
      {name: 'basementDoor', value: 'circle'},
      {name: 'fireEscapes', value: 'circle'},
      {name: 'awnings', value: 'circle'},
      {name: 'railins', value: 'circle'},
      {name: 'fences', value: 'circle'},
      {name: 'stairs', value: 'circle'},
      {name: 'gates', value: 'circle'},
      {name: 'securityDoo', value: 'circle'},
      {name: 'sindowGuards', value: 'circle'},
      {name: 'otherServices', value: 'circle'}
    ];

    const obj = this.documentForm.value.services;
    const result = Object.keys(obj).map(function(key) {
      return [String(key), obj[key]];
    });
    result.forEach((name, index) => {
      if (name[1]) { 
        services[index].value = 'dot';
      }
    });

    function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    
    this.subtotalPrice = '$' + formatNumber(this.documentForm.value.price.toFixed(2));
   
    if (this.documentForm.value.tax) {
      this.tax = '-';
      this.totalPrice = this.subtotalPrice;
      this.halfPrice = '$' + formatNumber((this.documentForm.value.price.toFixed(2)/2));
    } else {
      this.tax = '$' + formatNumber((this.documentForm.value.price * 0.06625).toFixed(2)); 
      this.totalPrice = '$' + formatNumber((this.documentForm.value.price + this.documentForm.value.price * 0.06625).toFixed(2));
      this.halfPrice = '$' + formatNumber(((this.documentForm.value.price+ this.documentForm.value.price * 0.06625).toFixed(2)/2));
    }

    this.logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZMAAAB7CAYAAACxfG06AAAAAXNSR0IArs4c6QAAAAlwSFlzAAAXEgAAFxIBZ5/SUgAAP+lJREFUeAHt3QncfWOdAPDTf9amSdpGoxRq0gyRCYWRf0rU0IIkSZY0tGhIloR/ZWudIlmSUBSRUESESGoqxShtRhPV1FTTzDT7zDvn+zTPdd7znnvPcs/d3nt+n8/73nvPec6z/M7z/Pbn99xvIYVkGcAvf/nL5N577w0j+fd///fk7//+75MjjzwyufXWWyuP7rd/+7eTo48+OnnmM5+Z3P/+909+8zd/M/md3/md5LGPfWzlOrqCHQY6DHQYmEcM3G+WmclnPvOZ5I477kj+93//N7n00kuTz33uc+EdbrHFFslGG22UrFixIvzFF4sx/MZv/Eb8GT7/7d/+LYn81Ke6/uVf/iW58sork5/+9KeBmbzxjW9MHvCABwQG8/znPz95xCMesaiO7keHgQ4DHQbmHQMzw0wQfZrHF77wheSEE05IHv7whyc///nPk3/4h39IXvKSlyS77LJLIPwYyOMe97hA/Id5uXfffXfyi1/8IjAX7Z544omJa094whOC1rPhhhsmb3jDG5LVV189WWuttYZpqnu2w0CHgQ4DM4+BqWcmt99+e9A4Lr/88uTqq69OXvCCFyQPetCDkl133TXZfvvtx/4C/vmf/zk57rjjgtby+c9/Pvn+978fTGMY2M4777xIExp757oGOwx0GOgwMCEMTCUzoW188YtfDD6P//mf/0n+67/+Kzn22GOD72LjjTeeEKqWNvujH/0o+du//dvkQx/6UILZrbnmmskGG2wQmMsjH/nI5Ld+67eWPtRd6TDQYaDDwDLEwFQxE2akyy67LDn++OOTxz/+8cl6662XHHHEEcm666479ajnazn99NODFnXJJZckO+ywQ7L77rsnO+2009T3vetgh4EOAx0GhsXAVDCTn/zkJ8krX/nK5LbbbktEYn3wgx9MnvrUpw7t9xgWOU2f//KXv5x89KMfTT7wgQ8EhviWt7wl2XLLLZPf+73fa1pl91yHgQ4DHQamGgMrJtk7zIP5ao011kj+8R//MWghzEbPeMYzZpaRwOcmm2ySvOMd70i+853vJH/8x38cNJStt946ufDCCyeJ7q7tDgMdBjoMjAwDE9FM/vM//zP4GA46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";

    this.estimate = {
      content: [{image:this.logo, width: 200, margin: [0, 50, 0, 0]}, 
      {text: 'Estimate', bold: true, margin: [390, -60, 0, 0], alignment: 'center', fontSize: 24},
      { bold: true, alignment: 'right', margin: [390, 0, 0, -80], stack: [{alignment: 'center', table: { body: [
        [{text: 'Date', style: 'tableHeader'}, {text: 'Estimate #', style: 'tableHeader'}],
        [ this.documentForm.value.date, this.documentForm.value.number]
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
            this.documentForm.value.customer
        ]}]]}}]},
      {fontSize: 10, alignment: 'left', margin: [0, 10, 0, 0], table: { widths: ['*', '*', '*', '*'], body: [
        [{text: 'SUMMARY OF SERVICES', style: 'tableHeader', colSpan: 4}, {}, {}, {}],
        [{ul: [
            {text: 'General Welding', listType: services[0].value},
            {text: 'General Repair', listType: services[1].value},
            {text: 'Basement Door', listType: services[2].value},
          ]}, {ul: [
            {text: 'Fire Escapes', listType: services[3].value},
            {text: 'Awnings', listType: services[4].value},
            {text: 'Railings', listType: services[5].value}
          ]}, {ul: [
            {text: 'Fences', listType: services[6].value},
            {text: 'Stairs', listType: services[7].value},
            {text: 'Gates', listType: services[8].value}
          ]}, {ul: [
            {text: 'Security Door', listType: services[9].value},
            {text: 'Window Guards', listType: services[10].value},
            {text: 'Other Services', listType: services[11].value}
      ]}]]}},
      {alignment: 'left', margin: [0, 10, 0, 0], table: { heights: ['', 220, 30, 30, 30], widths: [250, 120, '*'], body: [
      [{text: 'DESCRIPTION', style: 'tableHeader'}, {text: 'WORKSITE', style: 'tableHeader'}, {text: 'TOTAL', style: 'tableHeader'}],
      [{ type: 'none', ul: [
              {text: 'Service of:', margin: [0, 0, 0, 10], },
              {text:  this.documentForm.value.description, style: 'tableBody'},
              {text: this.documentForm.value.note, fontSize: 8, margin: [0, 40, 0, 0], },
            ]},
            {text: this.documentForm.value.worksite, alignment: 'center', fontSize: 10}, { type: 'none', ul: [
          {text: this.subtotalPrice, style: 'price'},
        ]}],
        [{border: [false, false, false, false], text: ''},
          {text: 'Subotal', style: 'price'},
          {type: 'none', ul: [
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
      {text:  this.totalPrice, style: 'price'},
      ]}]]}},
      {margin: [0, 30, 0, 0], table: { widths: ['*'], body: [
        [{text: 'NOTE',  style: 'tableHeader'}],
        [{text: 'This proposal is valid for 15 days following the date above. Estimated completion date is within 2 to 3 weeks from the date the contract is signed (possibility of delay due to unforeseen circumstances and interferences). A down payment is required when signing the contract (maximum of 3 days for a late payment if not given at signing). Down payment will be 50% of the total price and is non-refundable. The remaining 50% must be given once the service is complete. Any unforeseen or unnegotiated addition of work will be documented and may increase the total price. Please note that all items ordered in iron will rust.', fontSize: 7, alignment: 'center' }]]}}
      ],
      styles: {
        tableHeader: {fillColor: '#dddddd', alignment: 'center', fontSize: 10, bold: true },
        tableBody: { fontSize: 10 },
        price: { bold: true, alignment: 'center', margin: [-10, 6, 0, 0] },
      }
    };

    this.contract = {
      content: [{image:this.logo, width: 200, margin: [0, 50, 0, 0]}, 
        {text: 'Contract', style: 'document'},
        { style: 'tableNumber', stack: [{ style: 'date', table: { body: [
        [{text: 'Date', style: 'tableHeader'}, 
        {text: 'Contract #', style: 'tableHeader'}],
        [this.documentForm.value.date, this.documentForm.value.number]
      ]}}]},
      { style: 'customer', stack: [{ style: 'table2', table: { widths: ['*', '*'], body: [
        [{text: 'SERVICE PROVIDER', style: 'tableHeader'}, {text: 'CUSTOMER', style: 'tableHeader'}],
        [ {type: 'none', style: 'tableBody', ul: [
          'Jecche Steel • Glass • Aluminum LLC',
          '829 Broadway Avenue',
          'Newark, NJ 07104',
          'Phone: (862) 234-1559 Cell: (973) 368-3248',
          'Email: jecchellc@yahoo.com',
          'Web: www.jecche.com'
          ]}, {type: 'none',  style: 'tableBody', ul: [
            this.documentForm.value.customer
        ]}]]}}]},
      {style: 'tableServices', table: { widths: ['*', '*', '*', '*'], body: [
        [{text: 'SUMMARY OF SERVICES', style: 'tableHeader', colSpan: 4}, {}, {}, {}],
        [{ul: [
          {text: 'General Welding', listType: services[0].value},
          {text: 'General Repair', listType: services[1].value},
          {text: 'Basement Door', listType: services[2].value},
        ]}, {ul: [
          {text: 'Fire Escapes', listType: services[3].value},
          {text: 'Awnings', listType: services[4].value},
          {text: 'Railings', listType: services[5].value}
        ]}, {ul: [
          {text: 'Fences', listType: services[6].value},
          {text: 'Stairs', listType: services[7].value},
          {text: 'Gates', listType: services[8].value}
        ]}, {ul: [
          {text: 'Security Door', listType: services[9].value},
          {text: 'Window Guards', listType: services[10].value},
          {text: 'Other Services', listType: services[11].value}
      ]}]]}},
      {text: 'SERVICE AGREEMENT', style: 'header' },
      {text: '1. DESCRIPTION OF SERVICES. Beginning on upon agreement to this contract Jecche Steel Glass & Aluminum LLC will provide to ' + this.documentForm.value.attn + ' the following services:', style: 'paragraph' },
      { stack: [{ table: { heights: [0, 100], body: [
        [{text: 'Service of:', fontSize: 10, border: [false, false, false, false]}],
        [{text: this.documentForm.value.description, style: 'tableBody', margin: [0, 0, 0, 5], border: [false, false, false, false]}]
      ]}}]},
      {type: 'none',  style: 'tableBody', ul: [
        {text: 'Worksite: ' + this.documentForm.value.worksite, fontSize: 8, margin: [0, 10, 0, 0] },
        {text: this.documentForm.value.note, fontSize: 8, margin: [0, 10, 0, 0], },
      ]},
      {text: '2. PAYMENT FOR SERVICES. In exchange for the services ' + this.documentForm.value.attn + ' will pay Jecche Steel, Glass & Aluminum LLC according to the following schedule:', style: 'paragraph' },
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
      content: [{image:this.logo, width: 200, margin: [0, 50, 0, 0]}, {text: 'Invoice', bold: true, margin: [390, -60, 0, 0], alignment: 'center', fontSize: 24},
      { bold: true, alignment: 'right', margin: [390, 0, 0, -80], stack: [{alignment: 'center', table: { body: [
        [{text: 'Date', style: 'tableHeader'}, {text: 'Invoice #', style: 'tableHeader'}],
        [this.documentForm.value.date, this.documentForm.value.number]
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
            this.documentForm.value.customer
        ]}]]}}]},
      {fontSize: 10, alignment: 'left', margin: [0, 10, 0, 0], table: { widths: ['*', '*', '*', '*'], body: [
        [{text: 'SUMMARY OF SERVICES', style: 'tableHeader', colSpan: 4}, {}, {}, {}],
        [{ul: [
          {text: 'General Welding', listType: services[0].value},
          {text: 'General Repair', listType: services[1].value},
          {text: 'Basement Door', listType: services[2].value},
        ]}, {ul: [
          {text: 'Fire Escapes', listType: services[3].value},
          {text: 'Awnings', listType: services[4].value},
          {text: 'Railings', listType: services[5].value}
        ]}, {ul: [
          {text: 'Fences', listType: services[6].value},
          {text: 'Stairs', listType: services[7].value},
          {text: 'Gates', listType: services[8].value}
        ]}, {ul: [
          {text: 'Security Door', listType: services[9].value},
          {text: 'Window Guards', listType: services[10].value},
          {text: 'Other Services', listType: services[11].value}
      ]}]]}},
      {alignment: 'left', margin: [0, 10, 0, 0], table: { heights: ['', 220, 30, 30, 30], widths: [250, 120, '*'], body: [
      [{text: 'DESCRIPTION', style: 'tableHeader'}, {text: 'WORKSITE', style: 'tableHeader'}, {text: 'TOTAL', style: 'tableHeader'}],
      [{ type: 'none', ul: [
              {text: 'Service of:', margin: [0, 0, 0, 10], },
              {text: this.documentForm.value.description, style: 'tableBody'},
              {text: this.documentForm.value.note, fontSize: 8, margin: [0, 40, 0, 0], },
            ]},
            {text: this.documentForm.value.worksite, alignment: 'center', fontSize: 10}, { type: 'none', ul: [
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
      ],
      styles: {
        tableHeader: {fillColor: '#dddddd', alignment: 'center', fontSize: 10, bold: true },
        tableBody: { fontSize: 10 },
        price: { bold: true, alignment: 'center', margin: [-10, 6, 0, 0] },
      }
    }

    switch(this.typeForm.value.type) {
      case 'Estimate':
        pdfMake.createPdf( this.estimate ).open();
        break;
      case 'Contract':
        pdfMake.createPdf( this.contract ).open();
        break;
      case 'Invoice':
        pdfMake.createPdf( this.invoice ).open();
        break;
      default:
        alert('Something went wrong!');
    }
  }

}
