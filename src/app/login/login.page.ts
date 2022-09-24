import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginConstants } from '../shared/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  routetoSignup(): void {
    this.router.navigate(['signup']).then(()=>{
      window.location.reload();
   });
  }
logo=LoginConstants.imgPath.logo;
}
