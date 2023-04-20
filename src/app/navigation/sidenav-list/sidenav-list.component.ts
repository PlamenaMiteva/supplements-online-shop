import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/dto/category.model';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent {
  Category = Category;
  @Output() sidenavClose = new EventEmitter();

  constructor() { }
  
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
