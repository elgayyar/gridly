import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { MarkerManager } from '@agm/core';
import { MouseEvent } from '@agm/core';
import { TradeService } from '../services/trade.service';
import { variable } from '@angular/compiler/src/output/output_ast';

interface marker {
  lat: number;
  lng: number;
  label?: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  userProfile;
  friends = [];
  nonFriends = [];
  users;
  usersGeocode;
  zoom = 12;
  latitude = 42.9487956;
  longitude = -81.3887036;
  markers: marker[] = [];
  //Hard coded markers
  /*
  markers: marker[] = [
	  {
		  lat: 42.9869863,
		  lng: -81.25705929999999,
		  label: 'Luigi',
	  },
	  {
		  lat: 42.9969863,
		  lng: -81.21705929999999,
		  label: 'Sam'
	  },
	  {
		  lat: 42.9975863,
		  lng: -81.26705929999999,
		  label: 'Susan',
	  }
  ]
  */

  constructor(private mapService: MapService,
    private tradeService: TradeService) { }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    console.log(this.userProfile);
    //Get the users geocode
    this.getUserGeocode(this.userProfile);
    if(this.userProfile.accountStatus === "PRODUCER"){
      this.tradeService.getAllConsumers().subscribe(
        res => {
          this.users = res;
          console.log('CONSUMERS: ',this.users);
          this.sortFriends();
        },
        error => {
          console.log("Error response from hyperledger: ", error);
        });
    } else {
      this.tradeService.getAllProducers().subscribe(
        res => {
          this.users = res;
          console.log('PRODUCERS: ',this.users);
          this.sortFriends();
        },
        error => {
          console.log("Error response from hyperledger: ", error);
        });
    }
  }

  sortFriends(){
    // let context = this;
    let arrayLength = this.users.length;
    console.log("Array", this.users.length);
    for(var i = 0; i < arrayLength; i++){
      if(this.userProfile.friends && this.userProfile.friends.includes("resource:gridly.user.User#"+this.users[i].email)){
        this.friends.push(this.users[i]);
      }else{
          this.nonFriends.push(this.users[i]);
        }
    }
    
    // this.users.forEach(element => {
    //   if(context.userProfile.friends){
    //     if(context.userProfile.friends.includes("resource:gridly.consumer.Consumer#"+element.email)){
    //       context.friends.push(element);
    //       context.users = context.arrayRemove(context.users, element);
    //     }
    //   }
    // });
    if(!this.userProfile.friends){
      this.userProfile.friends = [];
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
 }
 
 add(user){
  this.nonFriends = this.arrayRemove(this.nonFriends, user);
  this.friends.push(user);
  //Plot the friend on the map
  this.mapFriend(user);
  this.userProfile.friends.push("resource:gridly.user.User#"+ user.email);
  console.log(this.userProfile.friends);
  if(this.userProfile.accountStatus == "PRODUCER"){
    this.tradeService.updateProducer(this.userProfile, this.userProfile.email).subscribe(
      res => {
        console.log(res);
        this.userProfile = res;
        localStorage.setItem("activeProfile", JSON.stringify(this.userProfile));
      },
      error => {
        console.log("Error response from hyperledger");
      });
  } else {
    this.tradeService.updateConsumer(this.userProfile, this.userProfile.email).subscribe(
      res => {
        console.log(res);
        this.userProfile = res;
        localStorage.setItem("activeProfile", JSON.stringify(this.userProfile));
      },
      error => {
        console.log("Error response from hyperledger");
      });
  }
  
}
 

 remove(friend){
  this.friends = this.arrayRemove(this.friends, friend);
  this.nonFriends.push(friend);
  this.userProfile.friends = this.arrayRemove(this.userProfile.friends, "resource:gridly.user.User#" + friend.email);
  if(this.userProfile.accountStatus == "PRODUCER"){
    this.tradeService.updateProducer(this.userProfile, this.userProfile.email).subscribe(
      res => {
        console.log(res);
        this.userProfile = res;
        localStorage.setItem("activeProfile", JSON.stringify(this.userProfile));
      },
      error => {
        console.log("Error response from hyperledger");
      });
  } else {
    this.tradeService.updateConsumer(this.userProfile, this.userProfile.email).subscribe(
      res => {
        console.log(res);
        this.userProfile = res;
        localStorage.setItem("activeProfile", JSON.stringify(this.userProfile));
      },
      error => {
        console.log("Error response from hyperledger");
      });
  }
  
 }
 
  //Gets the lat and long of the users address
  getUserGeocode(user) {
    //Format the users address
    var addressFormat = user.address.streetNo + "+" + 
                        user.address.streetName.split(' ').join('+') + ",+" +
                        user.address.city + ",+" +
                        user.address.province
    console.log("Formatted address", addressFormat);
    //Use the map service to get the response from google
    this.mapService.getGeocode(addressFormat).subscribe(
      res => {
        //ERROR!?!?!?!?!?
        let x = Object(res);
        console.log("Success from google", x.results[0].geometry.location);
        this.usersGeocode = x.results[0].geometry.location;
        console.log(this.usersGeocode);
        //const userMarker = marker("lat": this.getUserGeocode.lat, "lng": this.getUserGeocode.lng, "label": this.userProfile.fname );
        this.markers.push({"lat": x.results[0].geometry.location.lat, "lng": x.results[0].geometry.location.lng, "label": user.fname});
        //Update lat and lng
        //this.latitude = this.usersGeocode.lat;
        //this.longitude = this.usersGeocode.lng;
        console.log("Markers", this.markers);
      },
      error => {
        console.log("Error response from google:", error);

      });                   
  }

  //When a marker is clicked
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  //Plot the user on the map
  mapFriend(user) {
    this.getUserGeocode(user);
  }

}
