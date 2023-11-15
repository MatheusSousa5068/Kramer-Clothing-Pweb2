import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from '../../shared/model/plan';
import { PlanService } from '../../shared/services/plan.service';
import { KitService } from '../../shared/services/kit.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/model/user';

@Component({
  selector: 'app-plan-selection',
  templateUrl: './plan-selection.component.html',
  styleUrls: ['./plan-selection.component.scss']
})
export class PlanSelectionComponent {
  plans: Plan[] = [];
  selectedPlan: Plan | null = null;
  kitId: string = '';
  user: User | null = null;

  constructor(private planService: PlanService, private kitService: KitService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
      this.planService.getAll().subscribe(
        response => {
          this.plans = response;
        }
      )
      this.kitId = this.activatedRoute.snapshot.params['kitId'];
      this.kitService.getByAny({key: 'id',  value: this.kitId}).subscribe(
        response => {
          const kit = response[0];
          this.updatePrices(kit.factor);
        }
      );
      const userId = (this.activatedRoute.snapshot.params['userId?']);
      this.userService.getByAny({key: 'id', value: userId}).subscribe(
        response => {
          this.user = response[0];
        }
      )
  }

  toggleSelected(plan: Plan): void {
    if (this.isSelected(plan)) {
      this.selectedPlan = null;
    } else {
      this.selectedPlan = plan;
    }
  }

  isSelected(plan: Plan): boolean {
    return this.selectedPlan === plan;
  }

  canContinue(): boolean {
    return this.selectedPlan !== null;
  }

  updatePrices(factor: number): void {
    this.plans.map((plan) => plan.basePrice = plan.basePrice * factor);
    console.log(this.plans);
  }

  goToKits(): void {
    this.router.navigate(['/kits', this.user?.id]);
  }

  goToClothes(): void {
    this.router.navigate(['/clothes', this.kitId, this.selectedPlan?.id, this.user?.id])
  }

}
