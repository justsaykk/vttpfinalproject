import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageReference, UploadResult, getDownloadURL, getStorage, ref } from 'firebase/storage';
import { Subscription, firstValueFrom, lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private storageSvc: StorageService,
    private httpSvc: HttpService,
  ) { }

  form!: FormGroup;
  currentUser$!: Subscription
  currentUser!: User
  file!: File;
  fileName: string = "No file selected";

  ngOnInit(){
    this.currentUser$ = this.httpSvc.getProfile().subscribe((user: User) => {this.currentUser = user})
    this.form = this.createForm()
  }

  ngOnDestroy(): void {
    this.currentUser$.unsubscribe()
   }

  goBack(): void { this.location.back() }

  createForm(): FormGroup {
    return this.fb.group({
      email: this.fb.control({ value: this.currentUser.email, disabled: true }),
      name: this.fb.control(this.currentUser.name),
      image: this.fb.control('')
    })
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
    }
  }

  editProfile() {
    this.storageSvc.uploadFile(this.file)
      .then(
        (fullPath: string) => {
          return {
            name: this.form.value.name,
            email: this.currentUser.email,
            profilePic: fullPath,
            firebaseUID: this.currentUser.firebaseUID
          } as User
        }
      )
      .then((editedUser) => { this.httpSvc.editUser(editedUser) })
      .catch((err) => console.log(err))
      .then(() => { this.router.navigate(['/']) })
  }
}

