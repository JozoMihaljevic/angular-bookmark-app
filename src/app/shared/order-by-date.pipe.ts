import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'orderByDate',
})
export class OrderByDatePipe implements PipeTransform {

  transform(array: any, args?: any): any {
    array = array || [];

    return array.sort(function (a, b) {
      if (array !== undefined) {
        if (a[args.property] < b[args.property]) {
          return -1 * args.direction;
        } else if (a[args.property] > b[args.property]) {
          return 1 * args.direction;
        } else {
          return 0;
        }
      }
      return array;
    });
  }
}
