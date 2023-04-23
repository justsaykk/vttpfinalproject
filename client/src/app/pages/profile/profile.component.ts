import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { TransactionDetail, User } from 'src/app/models/models';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  transactions$!: Subscription
  currentUser$!: Subscription
  transactions!: TransactionDetail[]
  currentUser!: User
  profilePicUrl!: string
  panelOpenState = false;
  isLoading = true;

  constructor(
    private httpSvc: HttpService,
    private storageSvc: StorageService,
    private router: Router
    ) {  }

  async ngOnInit(){
    this.httpSvc.getTransactionsByEmail();
    this.transactions$ = this.httpSvc.getTransactionsByEmail$().subscribe((r) => {this.transactions = r})
    await this.httpSvc.getProfilefromDb()
    this.currentUser$ = this.httpSvc.getProfile().subscribe((user: User) => {this.currentUser = user})
    this.storageSvc.donwloadProfilePic(this.currentUser.firebaseUID)
          .then((url) => this.profilePicUrl = url)
          .catch((error) => {
            console.log(error)
            this.profilePicUrl = "assets/stock-profile-photo.jpeg"})
  }

      ngOnDestroy(): void {
          this.transactions$.unsubscribe()
          this.currentUser$.unsubscribe()
      }
    
      goToEditProfilePage() {
        this.router.navigate(['/edit-profile'])
      }

      goToDrinkDetail(idDrink: string) {
        this.router.navigate([`drink/${idDrink}`])
      }
  }

