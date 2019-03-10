import { Component, OnInit } from '@angular/core';
import { UserAccountModel } from '../models/userAccount.model';
import { UserModel } from '../models/user.model';  
import { ConsumerModel } from '../models/consumer.model';
import { ProducerModel } from '../models/producer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';

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
  
  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService) { }

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

  }

  //Register the user account
  registerUserAccount() {
    console.log(this.userAccount);
    const accountData = {
      email: this.userAccount.userAccountName,
      encryptedPassword: this.userAccount.password
      /*
      administratorProfile: {},
      producerProfile: {},
      consumerProfile: {
        email: this.userAccount.userAccountName
      }
      */
    }
    this.registerService.registerUserAccount(accountData).subscribe(
      res => {
        console.log("Response from auth server:");
        console.log(res);

      },
      error => {
        console.log("Error response from hyperledger");
      });
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
    //Format the data for HYPERLEDGER
    const consumerData = {
      $class: "gridly.consumer.Consumer",
      consumerStatus: true,
      email: this.user.email,
      fname: this.user.fName,
      lname: this.user.lName,
      address: {
        $class: "gridly.user.Address",
        streetNo: this.user.streetNo,
        streetName: this.user.streetName,
        city: this.user.city,
        postalCode: this.user.postalCode,
        province: this.user.province,
        country: this.user.country
      },
      homePhoneNo: this.user.homePhoneNo,
      mobilePhoneNo: this.user.mobilePhoneNo,
      accountStatus: "CONSUMER"
    }
    console.log("This is the data being sent to the backend", consumerData);
    //Send data to register service
    this.registerService.registerConsumer(consumerData).subscribe(
      res => {
        console.log(res);

      },
      error => {
        console.log("Error response from hyperledger");
      });
  }

  //Register a producer
  registerProducer() {
    //Format the data for HYPERLEDGER
    const producerData = {
      $class: "gridly.producer.Producer",
      producerStatus: true,
      consumerStatus: false,
      email: this.user.email,
      fname: this.user.fName,
      lname: this.user.lName,
      address: {
        $class: "gridly.user.Address",
        streetNo: this.user.streetNo,
        streetName: this.user.streetName,
        city: this.user.city,
        postalCode: this.user.postalCode,
        province: this.user.province,
        country: this.user.country
      },
      homePhoneNo: this.user.homePhoneNo,
      mobilePhoneNo: this.user.mobilePhoneNo,
      accountStatus: "PRODUCER"
    }
    console.log("This is the data being sent to the backend", producerData);
    //Send data to register service
    this.registerService.registerProducer(producerData).subscribe(
      res => {
        console.log(res);

      },
      error => {
        console.log("Error response from hyperledger");
      });
  }

  //Register a user
  registerUser() {
    //Create a producer
    if(this.accountType == true) {
      console.log("Producer");
      this.registerProducer()
    }
    //Create a consumer 
    else {
      console.log("Consumer");
      this.registerConsumer()
    }
  }

}
