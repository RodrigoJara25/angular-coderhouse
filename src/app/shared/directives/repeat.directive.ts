import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]',
  standalone: false
})
export class RepeatDirective implements OnChanges {
  @Input('appRepeat') numberOfRepetitions?: number;

  constructor(private template: TemplateRef<HTMLElement>, private viewContainer: ViewContainerRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['numberOfRepetitions']) {
      this.repeat();
    }
  }

  repeat(): void {
    this.viewContainer.clear();
    for (let index = 0; index < this.numberOfRepetitions!; index++) {
      this.viewContainer.createEmbeddedView(this.template);
    }
  }

}
