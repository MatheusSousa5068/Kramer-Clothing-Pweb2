import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/model/user';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  hide = true;
  user = new User('', '', '', '');

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.userService
      .getByAny({ key: 'email', value: this.user.email })
      .subscribe((found) => {
        if (found.length > 0) {
          alert(`Email ${this.user.email} já cadastrado`);
        } else {
          this.userService.create(this.user).subscribe();
          this.goToSignIn();
        }
      });
  }

  goToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }
}
