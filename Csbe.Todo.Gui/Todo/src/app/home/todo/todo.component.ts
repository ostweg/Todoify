import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CreateItemComponent} from "../../create-item/create-item.component";


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(public Dialog:MatDialog) { }
  IsVisible:boolean = false;
  ngOnInit() {

  }
  openDialog(){
    const dialogRef = this.Dialog.open(CreateItemComponent, {
      width:'500px'
    });
    dialogRef.afterClosed().subscribe( result => {
      //call get global data
    });
  }
  toggle(){
    this.IsVisible =! this.IsVisible;
    console.log(this.IsVisible);
  }


}
