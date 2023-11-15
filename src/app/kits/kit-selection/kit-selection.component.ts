import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kit } from '../../shared/model/kit';
import { User } from '../../shared/model/user';
import { KitService } from '../../shared/services/kit.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-kit-selection',
  templateUrl: './kit-selection.component.html',
  styleUrls: ['./kit-selection.component.scss']
})
export class KitSelectionComponent implements OnInit{
  kits: Kit[] = [];
  selectedKit: Kit | null = null;
  user: User | null = null;

  isUsserLoggedIn = false;

  constructor(private kitService: KitService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
      this.isUsserLoggedIn = this.userService.isLoggedIn();
      this.kitService.getAll().subscribe(
        response => {
          this.kits = response;
        }
      )
      const userId = (this.activatedRoute.snapshot.params['userId?']);
      this.userService.getByAny({key: 'id', value: userId}).subscribe(
        response => {
          this.user = response[0];
        }
      )
  }

  toggleSelected(kit: Kit): void {
    if (this.isSelected(kit)) {
      this.selectedKit = null;
    } else {
      this.selectedKit = kit;
      this.router.navigate(['/plans', this.selectedKit.id, this.user?.id]);
    }
  }

  isSelected(kit: Kit): boolean {
    return this.selectedKit === kit;
  }

  goToSignIn(): void {
    this.router.navigate(['/sign-in'])
  }
}
