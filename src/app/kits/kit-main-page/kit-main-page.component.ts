import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-kit-main-page',
  templateUrl: './kit-main-page.component.html',
  styleUrls: ['./kit-main-page.component.scss']
})
export class KitMainPageComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
      const userId = (this.activatedRoute.snapshot.params['userId?']);
      if (userId) {
        this.isLogged = true;
      }
  }
}
