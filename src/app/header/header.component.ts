import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

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
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.userAuthenticated = !!user;
      });

    // this.userSub = this.authService.user.subscribe((user) => {
    //   this.userAuthenticated = !!user;
    // });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  onLogout(){
    // this.userAuthenticated = false;
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }  

  // onStore(){
  //   this.productService.storeProducts();
  // }

  // onCreate(id: string){
  //   this.userService.createUser(id).subscribe(data=>console.log(data));
  // }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
