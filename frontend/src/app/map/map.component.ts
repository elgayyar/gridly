import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { MarkerManager } from '@agm/core';
import { MouseEvent } from '@agm/core';

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

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    console.log(this.userProfile);
    //Get the users geocode
    this.getUserGeocode();
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
        console.log("Success from google", res.results[0].geometry.location);
        this.usersGeocode = res.results[0].geometry.location;
        console.log(this.usersGeocode);
        //const userMarker = marker("lat": this.getUserGeocode.lat, "lng": this.getUserGeocode.lng, "label": this.userProfile.fname );
        this.markers.push({"lat": res.results[0].geometry.location.lat, "lng": res.results[0].geometry.location.lng, "label": this.userProfile.fname});
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
