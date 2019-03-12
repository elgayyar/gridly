import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  constructor(private adminService: AdminService) { 
  }
  transactionsList: any[] = [];
  displayedColumns: string[] = ['Time', 'Quantity', 'Unit Price', 'Total Price'];

  ngOnInit() {
   this.adminService.getAllTransactions().subscribe(res => {
     console.log("admin service, getAllTransactions returned: ", res);
     this.transactionsList = JSON.parse(JSON.stringify(res));
     console.log(this.transactionsList);
     console.log(this.transactionsList[0].timestamp);
   });


  };



  

 

  
}
