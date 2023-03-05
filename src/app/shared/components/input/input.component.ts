import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cme-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() control!: FormControl;

  public clearInput(): void {
    this.control.setValue(null);
  }
}
