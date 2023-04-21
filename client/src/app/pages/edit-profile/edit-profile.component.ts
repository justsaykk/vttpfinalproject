import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageReference, getDownloadURL, getStorage, ref } from 'firebase/storage';
import { Subscription } from 'rxjs';
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
    private authSvc: AuthService,
    private router: Router,
    private location: Location,
    private storageSvc: StorageService,
    private httpSvc: HttpService,
  ) { }

  form!: FormGroup;
  isAuthenticated$!: Subscription;
  isAuthenticated!: boolean;
  currentUser$!: Subscription;
  currentUser!: User
  file!: File;
  fileName!: string;

  ngOnInit(): void {
    this.isAuthenticated$ = this.authSvc.getIsAuthenticated().subscribe((b) => this.isAuthenticated = b)
    this.currentUser$ = this.authSvc.getCurrentUser().subscribe((user) => this.currentUser = user)
    if (this.isAuthenticated) {
      this.form = this.createForm()
    } else {
      this.router.navigate(['/'])
    }
  }

  ngOnDestroy(): void {
    this.isAuthenticated$.unsubscribe();
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
    let storageFileName = this.currentUser.firebaseUID
    const storage = getStorage();
    const storageRef: StorageReference = ref(storage, storageFileName);
    this.storageSvc.uploadFile(storageRef, this.file, this.currentUser)
      .then(() => {
        getDownloadURL(storageRef)
          .then(
            (url) => {
              console.log(url);
              return {
                name: this.form.value.name,
                email: this.currentUser.email,
                profilePic: url,
                firebaseUID: this.currentUser.firebaseUID
              } as User
            }
          )
          .then((editedUser) => { this.httpSvc.editUser(editedUser) })
          .catch((err) => console.log(err))
      })
      .then(() => this.router.navigate(['/profile']))
  }
}
