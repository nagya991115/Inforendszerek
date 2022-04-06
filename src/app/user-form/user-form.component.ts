import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup; 
  userExistList : User[] = []

  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
    

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.userExistList = await this.userService.getAll();
    this.userForm = this.formBuilder.group({
      id:[],
      username:['---', Validators.compose([Validators.minLength(3), Validators.required])],
      password:['---',Validators.compose([Validators.minLength(3), Validators.required])],
      role:['---',Validators.required],
    });

    if(id) {      
      const user = await this.userService.getUserByID(id);
      this.userForm.controls['id'].setValue(user?.id);
      this.userForm.controls['username'].setValue(user?.username);
      this.userForm.controls['password'].setValue(user?.password);
      this.userForm.controls['role'].setValue(user?.role);
    }
    else
    {
      this.userForm.controls['username'].addValidators(this.isusernameAlreadyExist(this.userExistList))
    }
  }

  private isusernameAlreadyExist(list : User[]) : ValidatorFn {
    return(control : AbstractControl) : ValidationErrors | null => {
      const index = list.find(x => x.username === control.value)

        if(index === undefined)
        {
          return null
        }
        else {
          return {usernameAlreadyExist : true}
        }
    }
  } 

  async addUser() {
    if(this.userForm.controls['role'].value === 'Admin')
    {
      this.userForm.controls['role'].setValue(1)
    }
    else
    {
      this.userForm.controls['role'].setValue(2)
    }
      const user = this.userForm.value;
      this.userService.addUser(user);
      this.router.navigateByUrl('/user-list');
  } 

}
