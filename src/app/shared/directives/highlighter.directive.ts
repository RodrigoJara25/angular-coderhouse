import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlighter]',
  standalone: false
})
export class HighlighterDirective {

  @Input() color?: string;

  constructor(private element: ElementRef<HTMLElement>) {
    this.modifyStyles();
  }

  ngOnInit(): void {
    this.modifyStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['color']) {
      this.modifyStyles();
    }
  }

  modifyStyles() :void {
    this.element.nativeElement.style.backgroundColor = this.color || 'yellow';
  }

}
