import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  hide = true;
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.userService
      .getByAny({ key: 'email', value: this.email })
      .subscribe((found) => {
        if (found[0]) {
          if (found[0].password == this.password) {
            this.userService.changeLoggedIn(true)
            this.router.navigate(['/kits', found[0].id]);
          }
        } else {
          alert(`Credenciais inválidas`);
        }
      });
  }

  goToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }
}
