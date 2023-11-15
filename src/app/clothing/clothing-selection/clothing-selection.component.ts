import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clothing } from '../../shared/model/clothing';
import { Plan } from '../../shared/model/plan';
import { Kit } from '../../shared/model/kit';
import { ClothingService } from '../../shared/services/clothing.service';
import { PlanService } from '../../shared/services/plan.service';
import { KitService } from '../../shared/services/kit.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/model/user';
@Component({
  selector: 'app-clothing-selection',
  templateUrl: './clothing-selection.component.html',
  styleUrls: ['./clothing-selection.component.scss']
})
export class ClothingSelectionComponent implements OnInit{
  clothes: Clothing[] = [];
  selectedClothes: Clothing[] = [];
  clothesRemaining: number | undefined;
  kit: Kit | null = null;
  plan: Plan | null = null;
  user: User | null = null;

  constructor(private clothingService: ClothingService, private planService: PlanService, private kitService: KitService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {

    const kitId = this.activatedRoute.snapshot.params['kitId'];
    this.kitService.getByAny({key: 'id', value: kitId}).subscribe(
      response => {
        this.kit = response[0];
      }
    );

    const planId = this.activatedRoute.snapshot.params['planId'];
    this.planService.getByAny({key: 'id', value: planId}).subscribe(
      response => {
        this.plan = response[0];
        this.calcClothesRemaining();
      }
    );

    const userId = (this.activatedRoute.snapshot.params['userId?']);
    this.userService.getByAny({key: 'id', value: userId}).subscribe(
      response => {
        this.user = response[0];
      }
    );

    if (kitId === '4') {
      this.clothingService.getAll().subscribe(
        response => {
          this.clothes = response;
          });
    } else {
      this.clothingService.getByAny({key: 'kitId', value: kitId}).subscribe(
        response => {
          this.clothes = response;
          });
    }
    this.calcClothesRemaining();
  }

  toggleSelected(clothing: Clothing): void {
    if (this.isSelected(clothing)) {
      this.selectedClothes = this.selectedClothes.filter((c) => c !== clothing);
    } else if (this.clothesRemaining === 0) {
      alert("There are no remaining clothes to choose.");
    } else {
      this.selectedClothes.push(clothing);
    }
    this.calcClothesRemaining();
  }

  isSelected(clothing: Clothing): boolean {
    return this.selectedClothes.includes(clothing);
  }

  isUnavailable(clothing: Clothing): boolean {
    return !this.selectedClothes.includes(clothing) && this.canContinue();
  }

  calcClothesRemaining(): void {
    if (this.plan !== null) {
      this.clothesRemaining = this.plan?.numOfClothes - this.selectedClothes.length;
    }
  }

  canContinue(): boolean {
    return this.clothesRemaining === 0;
  }

  goToPlans(): void {
    this.router.navigate(['plans', this.kit?.id, this.user?.id]);
  }

  goToFinalPage(): void {
    this.router.navigate(['thank-you', this.user?.id]);
  }

}
