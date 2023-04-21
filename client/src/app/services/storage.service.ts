import { Injectable } from '@angular/core';
import { StorageReference, uploadBytes } from 'firebase/storage';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  uploadFile(ref: StorageReference, file: File, user: User) {
    const metaData: any = {
      contentType: 'image/jpeg',
      userEmail: user.email,
      userUID: user.firebaseUID
    }
    return uploadBytes(ref, file, metaData);
  }
}
