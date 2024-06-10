import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '../../supabase/chat.service';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  private auth = inject(AuthService);
  private chat_Services = inject(ChatService);
  private router = inject(Router);
  private fb = inject(FormBuilder)
  chatForm!: FormGroup

  constructor() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required]
    })
  }
  logOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login'])
    }).catch(error => {
      alert(error.message);
    });
  }

  onSubmit() {
    const formValue = this.chatForm.value.chat_message;
    this.chat_Services.chatMessage(formValue).then((res) => {
      console.log(res);
      this.chatForm.reset();
    }).catch((err) => {
      alert(err.message);
    })
  }
}
