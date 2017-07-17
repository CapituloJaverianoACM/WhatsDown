import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../shared/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {

  userProfile: User;

  constructor(
    public navCtrl: NavController,
    private userProvider: UserProvider,
    public navParams: NavParams) { }

  ngOnInit() {
    this.userProvider.getUserProfile()
      .subscribe( (resp) => {
        this.userProfile = resp;
        let phonePrefix = this.userProfile.mobileNumber.substr(0,3) + " ";
        let phoneSufix = this.userProfile.mobileNumber.substr(3,9);
        this.userProfile.mobileNumber = phonePrefix + phoneSufix;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
