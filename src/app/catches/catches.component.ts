import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';
import { Catch } from './catch.model';
import { CatchesService } from './catches.service';

@Component({
  selector: 'app-catches',
  templateUrl: './catches.component.html',
  styleUrls: ['./catches.component.css'],
})
export class CatchesComponent implements OnInit {
  catches: Catch[] = [];

  constructor(
    private catchesService: CatchesService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.catchesService
      .getUserCatches(this.userService.uid!)
      .then((catches) => {
        this.catches = catches;
      })
      .catch((err) => {
        // show user friendly error here.
      });
  }
}
