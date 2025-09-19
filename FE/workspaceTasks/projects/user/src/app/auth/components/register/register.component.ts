import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CreateAccount } from '../../context/DTOs';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private userLogService:LoginService
  ) { }


registerForm!:FormGroup;
  // =========================
  ngOnInit(): void {

    this.createForm()
  }
  // =========================

  createForm(){

    this.registerForm = this.fb.group({

      email:['', Validators.required, Validators.email],
      password:['', Validators.required],
      username:['', Validators.required],
      confirmPassword:['', Validators.required],
      role:['user'],

    }, {validators: this.checkPassword})

  }
  // =========================
  createAcountReg(){

    let model:CreateAccount = {
      username:this.registerForm.value['username'],
 email:this.registerForm.value['email'],
 password:this.registerForm.value['password'],
 role:'user',

    }

    this.userLogService.createUser(model).subscribe(res =>{

    })
    console.log(this.registerForm);

  }
  // =========================

  checkPassword : ValidatorFn = (group:AbstractControl):ValidationErrors | null =>{

    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : {notSame: true}

  }
  // =========================

}
