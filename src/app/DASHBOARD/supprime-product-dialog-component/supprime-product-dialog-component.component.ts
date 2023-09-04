
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-supprime-product-dialog-component',
  templateUrl: './supprime-product-dialog-component.component.html',
  styleUrls: ['./supprime-product-dialog-component.component.css']
})
export class SupprimeProductDialogComponentComponent implements OnInit {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  productName!: string; // Define the productName property

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}


  confirmChanges(): void {
    // Process and validate the changes made in the dialog
    // Emit the result when the user confirms
    this.onClose.emit(true);
    this.bsModalRef.hide();
  }

  cancelChanges(): void {
    // Handle cancel action if needed
    this.onClose.emit(false);
    this.bsModalRef.hide();
  }
}
