import { Component } from '@angular/core';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  privateData: any;
  formInfo = {
    username: '',
    password: '',
    email:''
  };
  message: string;
  message2:string;
  user: any;
  error: string;

  constructor(private session: SessionService) { }

  login() {
    this.session.login(this.formInfo)
      .subscribe(
        (user) => this.user = user,
        (err) => this.error = err
      );
  }

  signup() {
    this.session.signup(this.formInfo)
      .subscribe(
        (user) => {
          this.user = user
        },
        (err) =>{
          this.error = err
          console.log('Eroorororororor: ',err)
          this.message='El usuario ya existe'
        }
      );
  }

  logout() {
  this.session.logout()
    .subscribe(
      () => this.user = null,
      (err) => this.error = err
    );
}

check() {
  console.log('email: ',this.formInfo.email)
this.session.exist(this.formInfo.email)
  .subscribe(
    (resp) => {if(resp.registered == true){
      this.message2 = "Registered: True"
    }
    else {
      this.message2 = "Registered: False"
    }
  },
    (err) => this.error = err
  );
}
}
