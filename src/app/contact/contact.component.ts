import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/footer/models/contact';
import { ContactService } from 'src/services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact: Contact = new Contact();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.contactService.sendMessage(this.contact).subscribe({
      next: (response) => {
        // Success Alert
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been sent successfully.',
          confirmButtonColor: '#3085d6'
        });

        // Reset the form
        this.contact = new Contact();
      },
      error: (error) => {
        console.error('Error sending message:', error);

        // Error Alert
        Swal.fire({
          icon: 'error',
          title: 'Failed to Send',
          text: 'There was an issue sending your message. Please try again.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }
}
