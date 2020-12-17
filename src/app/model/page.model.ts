import { Component, ElementRef, TemplateRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export class Page {
  public pageSize: PageSize;

  public headerElementTemplate: TemplateRef<any>;
  public headerElement;
  public footerElementTemplate: TemplateRef<any>;
  public footerElement;

  private elementsSub: BehaviorSubject<HTMLElement[]>;

  divElement: HTMLDivElement;

  constructor(
    pageSize: PageSize,
    headerTemplate: TemplateRef<any>,
    footerTemplate: TemplateRef<any>,
    elements?: HTMLElement[]
  ) {
    this.pageSize = pageSize;
    this.headerElementTemplate = headerTemplate;
    this.footerElementTemplate = footerTemplate;

    this.elementsSub = new BehaviorSubject(elements || []);
    this.divElement = document.createElement("div");
    this.divElement.classList.add("page");
    this.divElement.classList.add(this.pageSize);

    /*this.elementsSub.subscribe(els => {
      if (els.length > 0) {
        if (this.headerElementTemplate) {
          this.headerElement = this.divElement.append(
            this.headerElementTemplate.
          );
        }
        els.forEach(el => this.divElement.append(el));
        if (this.footerElementTemplate) {
          this.footerElement = this.divElement.append(
            this.footerElementTemplate.nativeElement
          );
        }
      }
    });*/
  }

  addElements(...elements: HTMLElement[]) {
    this.elementsSub.next(this.elementsSub.value.concat(...elements));
  }
}

type PageSize = "A3" | "A4";
