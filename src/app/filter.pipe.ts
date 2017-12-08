import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterType?: any): any {
    switch (filterType) {
      case 'Active':
        // tslint:disable-next-line:arrow-return-shorthand
        return value.filter(item => { return !item.done; });

      case 'Completed':
      // tslint:disable-next-line:arrow-return-shorthand
      return value.filter(item => { return item.done; });

      default:
        return value;
    }
  }

}
