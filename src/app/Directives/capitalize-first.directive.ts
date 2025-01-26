import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCapitalizeFirst]'
})
export class CapitalizeFirstDirective {
  // try in renderer 2 also

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() { }

  @HostListener('input', ['$event']) onInputChange(event: InputEvent){
    console.log("event:", event);
    const inputElement = this.el.nativeElement as HTMLInputElement;
    console.log("inputElement:", inputElement);
    const value = inputElement.value;
    console.log("inputElement.value:", value);
    console.log("value.charAt(0):", value.charAt(0));
    console.log("value.slice(1):", value.slice(1));


    if(value && value.length > 0){
      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);

      this.renderer.setProperty(inputElement, 'value', formattedValue);
      console.log("this.renderer:", this.renderer);
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent){
    console.log("event for paste:", event);
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text') || '';
    console.log("clipboardData:", clipboardData);
    const formattedValue = clipboardData.charAt(0).toUpperCase() + clipboardData.slice(1);
    const inputElement = this.el.nativeElement as HTMLInputElement;

    this.renderer.setProperty(inputElement, 'value', formattedValue);
    console.log("this.renderer:", this.renderer);
  }

}
