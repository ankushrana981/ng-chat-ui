import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '../../supabase/chat.service';
import { Ichart } from '../../interface/chat-response';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  private auth = inject(AuthService);
  private chat_Services = inject(ChatService);
  private router = inject(Router);
  private fb = inject(FormBuilder)
  chatForm!: FormGroup;
  charts = signal<Ichart[]>([])

  constructor() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required]
    })

    effect(()=>{
      this.onListChat();
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
    console.log(this.chatForm,"form value")
    this.chat_Services.chatMessage(formValue).then((res) => {
      console.log(res);
      this.chatForm.reset();
      this.onListChat();
    }).catch((err) => {
      alert(err.message);
    })
  }

  onListChat(){
    this.chat_Services.listChat().then((res:Ichart[] | null) => {
      console.log(res);
      if(res !== null){
        this.charts.set(res)
      }
      else{
        console.log("No message found!");
      }
    }).catch((err) => {
      alert(err.message);
    })
  }
}
