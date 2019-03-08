import { Component, OnInit } from '@angular/core';
import { UserAccountModel } from '../models/userAccount.model';
import { UserModel } from '../models/user.model';  
import { ConsumerModel } from '../models/consumer.model';
import { ProducerModel } from '../models/producer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userAccount = new UserAccountModel();
  user = new UserModel();
  consumer = new ConsumerModel();
  producer = new ProducerModel();
  userAccountForm: FormGroup;
  userForm: FormGroup;
  consumerForm: FormGroup;
  producerForm: FormGroup;
  //False means consumer, True means producer
  accountType: boolean;
  provinces = ["AB", "BC", "MB", "NB", "NL", "NT", "NT", "NS", "NU", "ON", "PE", "QC", "SK", "YT"]
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    //User account form
    this.userAccountForm = this.formBuilder.group({
      'userAccountName': [this.userAccount.userAccountName,[
        Validators.required,
        Validators.email
      ]],
      'password' : [this.userAccount.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]] 
    });

    //User form
    this.userForm = this.formBuilder.group({
      'fName': [this.user.fName, [
        Validators.required
      ]],
      'lName': [this.user.lName, [
        Validators.required
      ]],
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      'homePhoneNo': [this.user.homePhoneNo, [
        Validators.required
      ]],
      'mobilePhoneNo': [this.user.mobilePhoneNo, [
        Validators.required
      ]],
      'streetNo': [this.user.streetNo, [
        Validators.required
      ]],
      'streetName': [this.user.streetName, [
        Validators.required
      ]],
      'city': [this.user.city, [
        Validators.required
      ]],
      'postalCode': [this.user.postalCode, [
        Validators.required
      ]],
      'province': [this.user.province, [
        Validators.required
      ]],
      'country': [this.user.country, [
        Validators.required
      ]],      
    });

    /** 
    //Consumer form
    this.consumerForm = this.formBuilder.group({
      'fName': [this.consumer.fName, [
        Validators.required
      ]],
      'lName': [this.consumer.lName, [
        Validators.required
      ]],
      'email': [this.consumer.email, [
        Validators.required,
        Validators.email
      ]],
      'homePhoneNo': [this.consumer.homePhoneNo, [
        Validators.required
      ]],
      'mobilePhoneNo': [this.consumer.mobilePhoneNo, [
        Validators.required
      ]],
      'streetNo': [this.consumer.streetNo, [
        Validators.required
      ]],
      'streetName': [this.consumer.streetName, [
        Validators.required
      ]],
      'city': [this.consumer.city, [
        Validators.required
      ]],
      'postalCode': [this.consumer.postalCode, [
        Validators.required
      ]],
      'province': [this.consumer.province, [
        Validators.required
      ]],
      'country': [this.consumer.country, [
        Validators.required
      ]],      
    });

    //Producer form
    this.producerForm = this.formBuilder.group({
      'fName': [this.producer.fName, [
        Validators.required
      ]],
      'lName': [this.producer.lName, [
        Validators.required
      ]],
      'email': [this.producer.email, [
        Validators.required,
        Validators.email
      ]],
      'homePhoneNo': [this.producer.homePhoneNo, [
        Validators.required
      ]],
      'mobilePhoneNo': [this.producer.mobilePhoneNo, [
        Validators.required
      ]],
      'streetNo': [this.producer.streetNo, [
        Validators.required
      ]],
      'streetName': [this.producer.streetName, [
        Validators.required
      ]],
      'city': [this.producer.city, [
        Validators.required
      ]],
      'postalCode': [this.producer.postalCode, [
        Validators.required
      ]],
      'province': [this.producer.province, [
        Validators.required
      ]],
      'country': [this.producer.country, [
        Validators.required
      ]],      
    });

    **/

  }

  //Register the user account
  registerUserAccount() {
    console.log(this.userAccount);
  }

  //User wants to be a consumer
  isConsumer() {
    console.log("Consumer");
    this.accountType = false;
    this.consumer.consumerStatus = true;
  }

  //User wants to be a producer
  isProducer() {
    console.log("Producer");
    this.accountType = true;
    this.producer.producerStatus = true;
  }

  //Register a consumer
  registerConsumer() {
    console.log(this.consumer);
  }

  //Register a producer
  registerProducer() {
    console.log(this.producer);
  }

  //Register a user
  registerUser() {
    //Create a producer
    if(this.accountType == true) {
      console.log("Producer");
      console.log(this.user);

    }
    //Create a consumer 
    else {
      console.log("Consumer");
      console.log(this.user);
    }
  }

}
