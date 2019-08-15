import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter'
  })

export class SearchPipe implements PipeTransform {
    transform(value: any, term: any) {
        if (!term) { return value; }
        return value.filter((item: any) => {
          for (let prop in item) {
            if (typeof item[prop] === 'string' && 
              item[prop].toLowerCase().indexOf(term.toLowerCase()) > -1) {
              return true;
            }
          }
          return false;
        });
    }
}