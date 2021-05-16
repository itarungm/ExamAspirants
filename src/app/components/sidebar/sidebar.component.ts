import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/square-number', title: 'Square Number',  icon:'person', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  name="What Should I Call Your Name?"
  inputBox=false;
  givenName = new FormControl(null);
  avatar=null;
  constructor() { 
    if(localStorage.getItem('userName')){
      this.name=sessionStorage.getItem('userName')
    }
    if(localStorage.getItem('avatar')){
      this.avatar=localStorage.getItem('avatar')
    }
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  editName(){
    this.inputBox=true;
  }

  nameSubmitted(){
    this.givenName.markAsTouched();
    this.name=this.givenName.value;
    localStorage.setItem('userName',this.name)
    this.inputBox=false;
  }

  selectAvatar(event,fileUpload){
    const file = (event.target as HTMLInputElement).files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=> {
      this.avatar = reader.result;
      localStorage.setItem('avatar',this.avatar)
    };
  }
}
