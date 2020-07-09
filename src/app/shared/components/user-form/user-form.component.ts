import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /*
const schema = Joi.object({
    firstName: Joi.string()
      .alphanum()
      .min(NAME_MIN_LENGTH)
      .max(NAME_MAX_LENGTH)
      .required(),
    lastName: Joi.string()
      .alphanum()
      .min(NAME_MIN_LENGTH)
      .max(NAME_MAX_LENGTH)
      .required(),
    phone: Joi.string().min(PHONE_MIN_LENGTH).max(PHONE_MAX_LENGTH).required(),
    email: Joi.string()
      .min(EMAIL_MIN_LENGTH)
      .max(EMAIL_MAX_LENGTH)
      .email()
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{8,15}$'))
      .required(),
    roles: Joi.array().items(Joi.string()),
  });

  */

}
