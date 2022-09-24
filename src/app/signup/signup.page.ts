import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginConstants } from '../shared/constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  routetoLogin(): void {
      window.location.reload();    this.router.navigate(['login']).then(()=>{

   });
  }
  logo=LoginConstants.imgPath.logo;
}
