import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure, FirebaseuiAngularLibraryService } from 'firebaseui-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService
  ) {
    firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
   }


  ngOnInit(): void { }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult){ }
    
  errorCallback(errorData: FirebaseUISignInFailure){ }
  
  uiShownCallback() {
    console.log("UI is shown")
   }

}
