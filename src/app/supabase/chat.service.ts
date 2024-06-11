import { Injectable, signal } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Ichart } from '../interface/chat-response';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private supaBase!: SupabaseClient
  public savedChat = signal({});
  constructor() {
    this.supaBase = createClient(
      environment.supaBaseUrl,
      environment.supaBaseKey
    )
   }

   async chatMessage(text:string) {
    try {
      const { data, error } = await this.supaBase.from('chat').insert({text})
      if(error){
        alert(error.message)
      }
      return data;
    } catch (error) {
      alert(error)
      return
    }
   }

   async listChat(){
    try {
      const { data, error} = await this.supaBase.from('chat').select('*,users(*)')
      if(error){
        console.log(error.message);
      }

      return data;
    } catch (error) {
      throw error
    }

   }
    async deleteChat(id:string){
      const data = await this.supaBase.from('chat').delete().eq('id',id)
    
    return data;
    }
   SelectedChat(msg:Ichart){
    this.savedChat.set(msg)
   }
}
