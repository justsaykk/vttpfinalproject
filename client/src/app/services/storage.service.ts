import { Injectable, inject } from '@angular/core';
import { StorageReference, UploadResult, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { AuthService } from './auth.service';
import { firstValueFrom, map, take } from 'rxjs';
import { Storage } from '@angular/fire/storage';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private authSvc: AuthService,
  ) { }

  private storage: Storage = inject(Storage)

  async uploadFile(file: File): Promise<string> {
    return firstValueFrom(this.authSvc.authState$).then(
      async (user) => {
        console.log(user?.uid)
        const storageRef: StorageReference = ref(this.storage, `images/${user?.uid}`);
        const uploadResult: UploadResult = await uploadBytes(storageRef, file);
        return uploadResult.ref.fullPath;  
      }
    )
  }

  async donwloadProfilePic(firebaseUID: string): Promise<string> {
    console.log(firebaseUID)
    const fileRef: StorageReference = ref(this.storage, `images/${firebaseUID}`)
    const url: string = await getDownloadURL(fileRef);
    return url;
  }

}