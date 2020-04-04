import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AutgoogleService {

  constructor(
    private af: AngularFireAuth
  ) { }

  login() {
    return this.af.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    return this.af.auth.signOut();
  }

  hasUser() {
    return this.af.authState;
  }
}
