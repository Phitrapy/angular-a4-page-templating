import { Component, ElementRef, TemplateRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-page",
  templateUrl: "page.component.html",
  styleUrls: ["page.component.scss"]
})
export class PageComponent {
  public pageSize: PageSize;

  public headerElementTemplate: ElementRef;
  public headerElement;
  public footerElementTemplate: ElementRef;
  public footerElement;

  private elementsSub: BehaviorSubject<HTMLElement[]>;

  get elementsToRender_() {
    return ["header", this.elementsSub.value, "footer"];
  }

  divElement: HTMLDivElement;

  constructor(
    pageSize: PageSize,
    headerTemplate: ElementRef,
    footerTemplate: ElementRef,
    elements?: HTMLElement[]
  ) {
    this.pageSize = pageSize;
    this.headerElementTemplate = headerTemplate;
    this.footerElementTemplate = footerTemplate;

    this.elementsSub = new BehaviorSubject(elements || []);
    this.divElement = document.createElement("div");
    this.divElement.classList.add("page");
    this.divElement.classList.add(this.pageSize);

    this.elementsSub.subscribe(els => {
      console.log("new Elements", els);
      if (els.length > 0) {
        if (this.headerElement) {
          this.divElement.removeChild(this.headerElement);
        }
        if (this.headerElementTemplate) {
          this.headerElement = this.divElement.append(
            this.headerElementTemplate.nativeElement
          );
        }
        els.forEach(el => this.divElement.append(el));
        if (this.footerElement) {
          this.divElement.removeChild(this.footerElement);
        }
        if (this.footerElementTemplate) {
          this.footerElement = this.divElement.append(
            this.footerElementTemplate.nativeElement
          );
        }
      }
    });
  }

  addElements(...elements: HTMLElement[]) {
    this.elementsSub.next(this.elementsSub.value.concat(...elements));
  }
}

type PageSize = "A3" | "A4";
