import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth : AngularFireAuth,private toastr :ToastrService ) { }


  login( email ,password){
    this.afAuth.signInWithEmailAndPassword(email,password).then( logRef => {
      this.toastr.success( 'Login Success')
     }); //
  }


}
