import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from "../models/user";
import { AlertService } from "../providers/alert/alert.service";
import { UserService } from "../providers/user/user.service";
import { LoaderService } from 'app/providers/loader/loader.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userEditForm: FormGroup;
  message: string;
  loader: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private alertService: AlertService, private loaderService: LoaderService) {

    this.loaderService.getLoader().subscribe(loaderData => this.loader = loaderData);

   }

  ngOnInit() {
    this.createUserEditForm();
  }

  createUserEditForm() {
    //Validator login form model
    this.userEditForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  updateUserProfile({value, valid} : { value : User, valid: boolean }) {
    //Start loader
    this.loaderService.showLoader();
    this.userService.UpdateFbUser(value.firstname, value.lastname).subscribe(
      (data) => {
      //Call alert service for message
      if(data) {
        this.alertService.success(data, false);
        this.userEditForm.reset();
        this.loaderService.hideLoader();
      }
    });
  }
}
