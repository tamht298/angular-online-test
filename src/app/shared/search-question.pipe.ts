import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter'
  })

export class SearchPipe implements PipeTransform {
    transform(list: any[], filterText: string){
        return list.filter(item=>{
            item.questionContent.toLowerCase().includes(filterText.toLowerCase());
        })
    }
}