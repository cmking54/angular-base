import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toImageName'
  //,pipe:false //stateful
})
export class ImageNamePipe implements PipeTransform {
  transform(value: string, args: any[]) : string {
    let ret_string = "";
    for (let i = 0; i < value.length; i++) {
      if (['&#9794;'].includes(value.charAt(i))) {
        ret_string += '-m';
      } else if (['	&#9792;'].includes(value.charAt(i))) {
        ret_string += '-f';
      } else if (['\''].includes(value.charAt(i))) {
        // ret_string += value.charAt('-m');
      } else {
        ret_string += value.charAt(i);
      }
    }
    return ret_string.toLowerCase();
  }
}
