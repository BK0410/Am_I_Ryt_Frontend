import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginConstants } from '../constant';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}
  homeRoute(){
    this.router.navigate(['home']).then(()=>{
      window.location.reload();
   });

  }
  logo=LoginConstants.imgPath.logo;
}
