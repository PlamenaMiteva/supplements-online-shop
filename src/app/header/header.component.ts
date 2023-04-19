import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthenticated = false;
  private userSub: Subscription;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.userAuthenticated = !!user;
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  onLogout(){
    this.userAuthenticated = false;
    this.authService.logout();
  }  

  // onStore(){
  //   this.productService.storeProducts();
  // }

  onCreate(id: string){
    this.userService.createUser(id).subscribe(data=>console.log(data));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
