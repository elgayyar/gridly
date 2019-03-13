import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { MarkerManager } from '@agm/core';
import { MouseEvent } from '@agm/core';
import { TradeService } from '../services/trade.service';

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
  users;
  usersGeocode;
  zoom = 12;
  latitude = 42.9487956;
  longitude = -81.3887036;
  //Hard coded markers
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

  constructor(private mapService: MapService,
    private tradeService: TradeService) { }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    console.log(this.userProfile);
    //Get the users geocode
    this.getUserGeocode();
    this.tradeService.getAllConsumers().subscribe(
      res => {
        this.users = res;
        console.log('CONSUMERS: ',this.users);
        this.sortFriends();
      },
      error => {
        console.log("Error response from hyperledger: ", error);
      });
  }

  sortFriends(){
    let context = this;
    this.users.forEach(element => {
      if(context.userProfile.friends){
        if(context.userProfile.friends.includes(element)){
          context.friends.push(element);
          context.users = context.arrayRemove(context.users, element);
        }
      }
    });
    if(!context.userProfile.friends){
      context.userProfile.friends = [];
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
 }
 
 add(user){
  this.users = this.arrayRemove(this.users, user);
  this.friends.push(user);
  this.userProfile.friends.push("resource:gridly.user.User#"+ user.email);
  let msg = this.tradeService.updateProducer(this.userProfile);
  console.log(msg);
 }
 remove(friend){
  this.friends = this.arrayRemove(this.friends, friend);
  this.users.push(friend);
  this.userProfile.friends = this.arrayRemove(this.userProfile.friends, "resource:gridly.user.User#" + friend.email);
  let msg = this.tradeService.updateProducer(this.userProfile);
  console.log(msg);
 }
 
  //Gets the lat and long of the users address
  getUserGeocode() {
    //Format the users address
    var addressFormat = this.userProfile.address.streetNo + "+" + 
                        this.userProfile.address.streetName.split(' ').join('+') + ",+" +
                        this.userProfile.address.city + ",+" +
                        this.userProfile.address.province
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
        this.markers.push({"lat": x.results[0].geometry.location.lat, "lng": x.results[0].geometry.location.lng, "label": this.userProfile.fname});
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

}
