import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private supaBase!: SupabaseClient
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
}
