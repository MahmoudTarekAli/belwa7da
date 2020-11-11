import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'localizedDate',
  pure: false  // required to update the value when currentLang is changed
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) { }
  transform(value: any, pattern: string = 'shortDate'): any {
    const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
    return datePipe.transform(value, pattern);

  }

}
