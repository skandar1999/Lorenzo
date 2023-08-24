import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-product-dialog-component',
  templateUrl: './edit-product-dialog-component.component.html',
  styleUrls: ['./edit-product-dialog-component.component.css']
})
export class EditProductDialogComponentComponent implements OnInit {
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
