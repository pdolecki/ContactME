import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'cme-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  loadingActive$ = this.loaderService.loadingActive$;

  constructor(private loaderService: LoaderService) {}
}
