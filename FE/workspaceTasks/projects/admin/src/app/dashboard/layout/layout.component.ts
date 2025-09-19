import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  lang:any ="en";
  constructor(private translate:TranslateService) {
    this.lang = translate.currentLang
   }

  ngOnInit(): void {
  }

  changeLanguage(){

if(this.lang == "en"){
  localStorage.setItem('language', 'ar')
}else{
  localStorage.setItem('language', 'en')
}
window.location.reload()

  }



}
