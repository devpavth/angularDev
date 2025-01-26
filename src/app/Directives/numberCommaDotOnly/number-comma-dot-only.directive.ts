import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appNumberCommaDotOnly]'
})
export class NumberCommaDotOnlyDirective {

  private el = inject(ElementRef);
  private regex: RegExp = new RegExp(/^\d{1,3}(,\d{3})*(\.\d{0,2})?$/);

  constructor() { }

  @HostListener('input', ['$event']) onInputChange(event: InputEvent){
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let currentValue = inputElement.value;

    if(!this.regex.test(currentValue)){
      console.log("currentValue:", currentValue);
      currentValue = this.correctInput(currentValue, inputElement);
      inputElement.value = currentValue;
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent){
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text') || '';
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const filteredValue = this.correctInput(clipboardData, inputElement);

    inputElement.value = filteredValue;

    const cursorPosition = filteredValue.length;
    setTimeout(() => {
      inputElement.setSelectionRange(cursorPosition, cursorPosition);
      console.log("setSelectionRange:", inputElement.setSelectionRange(cursorPosition, cursorPosition));
    })
  }

  private correctInput(value: string, inputElement: HTMLInputElement): string{
    console.log("inputElement in correctInput:", inputElement);
    console.log("value in method:", value);
    const cursorPosition = inputElement.selectionStart || 0;
    console.log("cursorPosition:", cursorPosition);
    value = value.replace(/[^0-9,.]/g, '');
    console.log("value after cursorPosition:", value);

    const parts = value.split('.');
    console.log("parts:", parts);
    if(parts.length > 2){
      value = `${parts[0]}.${parts.slice(1).join('')}`;
      console.log("value:", value);
    }
    console.log("values after parts:", value);
    const [integerPart, decimalPart] = value.split('.');
    console.log("integerPart:", integerPart);
    console.log("decimalPart:", decimalPart);
    const formattedInteger = this.formatIndianCurrency(integerPart);
    console.log("formattedInteger:", formattedInteger);
    const formattedDecimal = decimalPart ? decimalPart.replace(/[^0-9]/g, '') : '';
    const newValue = decimalPart !== undefined ? `${formattedInteger}.${formattedDecimal}` : formattedInteger;
    console.log("newValue:", newValue);

    setTimeout(() => {
      console.log("value in settimeout:", value);
      const offset = newValue.length - value.length;
      console.log("offset:", offset);
      console.log("cursorPosition in settimeout:", cursorPosition);
      const newCursorPosition = Math.max(0, cursorPosition + offset);
      inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
      console.log("setSelectionRange:", inputElement.setSelectionRange(newCursorPosition, newCursorPosition));
    });

    return newValue;
  }

  // private formatIndianCurrency(integerPart: string): string{
  //   if(!integerPart) return '';

  //   const reversed = integerPart.split('').reverse().join('');

  //   const formattedReversed = reversed
  //   .replace(/(\d{3})(?=\d)/, '$1,')
  //   .replace(/(\d{2})(?=(\d{2})+(?!\d))/g, '$1,');

  //   return formattedReversed.split('').reverse().join('');
  // }



  private formatIndianCurrency(integerPart: string): string {
    if (!integerPart) return '';
  
    // Remove all invalid commas (extra or misplaced commas)
    integerPart = integerPart.replace(/,+/g, ''); // Remove multiple commas
  
    let result = '';
    let count = 0;
  
    // Loop through the string in reverse to add commas
    for (let i = integerPart.length - 1; i >= 0; i--) {
      console.log("resullt:", result);
      result = integerPart[i] + result;
      console.log("result after:", result);
      count++;
      console.log("count incremenet:", count);
  
      // Add a comma after 3 digits, then every 2 digits
      if (count === 3 && i !== 0) {
        result = ',' + result;
      } else if (count > 3 && (count - 3) % 2 === 0 && i !== 0) {
        result = ',' + result;
      }
      console.log("after comma result:", result);
    }
  
    return result;
  }
  
  

}
