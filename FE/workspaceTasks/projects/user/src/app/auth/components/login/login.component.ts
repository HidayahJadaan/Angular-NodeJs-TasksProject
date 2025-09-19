import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private logService:LoginService,
    private router:Router
  ) { }
loginForm!:FormGroup

  ngOnInit(): void {
    this.createForm();
  }

  // =====================
  createForm(){
    this.loginForm = this.fb.group({

      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]],
      role:['user'],
    })
  }

  // =====================

login(){
  this.logService.login(this.loginForm.value).subscribe((res:any)=>{
this.router.navigate(['/tasks']);
  })

  console.log('success Login!');

}


}
