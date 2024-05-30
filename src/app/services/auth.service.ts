import { Injectable, NgZone, inject } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supaBase!: SupabaseClient;
  private router = inject(Router)
  private _ngZone = inject(NgZone)
  constructor() {
    this.supaBase = createClient(environment.supaBaseUrl,environment.supaBaseKey);
    this.supaBase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)

      localStorage.setItem('session', JSON.stringify(session?.user))
      if(session?.user){
        this._ngZone.run(() => {
        this.router.navigate(['/chat'])
        })
      }
    })
  
  }
  get isLoggedIn():boolean {
    const user = localStorage.getItem('session') as string;
    return user === 'undefined' ? false : true ;
  }

  async signInWithGoogle() {
    await this.supaBase.auth.signInWithOAuth({
      provider: 'google'
    })
  }

  async signOut() {
      await this.supaBase.auth.signOut()
  }
}
