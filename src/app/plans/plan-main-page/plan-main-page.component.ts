import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plan-main-page',
  templateUrl: './plan-main-page.component.html',
  styleUrls: ['./plan-main-page.component.scss']
})
export class PlanMainPageComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
      const userId = (this.activatedRoute.snapshot.params['userId?']);
      if (userId) {
        this.isLogged = true;
      }
  }
}
