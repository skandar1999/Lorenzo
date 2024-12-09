import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/services/contact.service';
import { Contact } from 'src/app/footer/models/contact';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  messages: any[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  // Fetch all messages
  fetchMessages(): void {
    this.contactService.getAllMessages().subscribe({
      next: (response) => {
        this.messages = response; // Populate the messages array
        console.log('Messages fetched successfully:', this.messages);
      },
      error: (error) => {
        console.error('Error fetching messages:', error);
      }
    });
  }

  updateSeemStatus(id: string): void {
    // Confirm before updating
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to mark this message as seen?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, mark as seen',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Show loading spinner
        Swal.fire({
          title: 'Updating...',
          text: 'Please wait while we update the message status.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
  
        // Perform the update
        this.contactService.updateSeemStatus(id).subscribe({
          next: (updatedMessage) => {
            // Update the local list
            const index = this.messages.findIndex((msg) => msg.id === updatedMessage.id);
            if (index !== -1) {
              this.messages[index].seem = updatedMessage.seem;
            }
  
            // Show success notification
            Swal.fire({
              icon: 'success',
              title: 'Message Updated',
              text: 'Message status has been marked as seen!',
            });
            this.fetchMessages(); // Refresh the list of messages

          },
          error: (error) => {
            console.error('Error updating message status:', error);
  
            // Show error notification
            Swal.fire({
              icon: 'error',
              title: 'Update Failed',
              text: 'Could not update message status. Please try again.',
            });
          },
        });
      }
    });
  }
  

  deleteMessage(id: string): void {
    console.log('Deleting message with id:', id);  // Log the id to check if it's correct
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'This message will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.deleteMessage(id).subscribe({
          next: (response) => {
            Swal.fire('Deleted!', 'The message has been deleted.', 'success');
            this.fetchMessages(); // Refresh the list of messages
          },
          error: (error) => {
            Swal.fire('Error!', 'There was an error deleting the message.', 'error');
            console.error('Error deleting message:', error);
          },
        });
      }
    });
  }
  
}
