import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Page } from "../model/page.model";

@Component({
  selector: "app-paginated-view",
  templateUrl: "paginated-view.component.html",
  styleUrls: ["paginated-view.component.scss"]
})
export class PaginatedViewComponent implements AfterViewInit, AfterViewChecked {
  @Input() pageSize: "A3" | "A4" = "A4";

  @ViewChild("paginatedView") paginatedView: ElementRef<HTMLDivElement>;

  @ViewChild("contentWrapper") contentWrapper: ElementRef<HTMLDivElement>;

  @ContentChildren("pageContent", { read: ElementRef }) elements: QueryList<
    ElementRef
  >;

  @ViewChild("pageHeader", { read: ElementRef })
  headerTemplate: TemplateRef<any>;

  @ViewChild("pageFooter", { read: ElementRef })
  footerTemplate: TemplateRef<any>;

  pages$ = new BehaviorSubject<Page[]>([]);

  paginatedViewHtml$ = new BehaviorSubject<string>("");

  constructor(private changeDedectionRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.updatePages();

    // when ever childs updated call the updatePagesfunction
    this.elements.changes.subscribe(el => {
      this.updatePages();
    });

    this.pages$.subscribe(pages =>
      pages.forEach((page, pIndex, arr) => {
        page.headerElementTemplate = this.headerElements.find(
          (el, i, arr) => pIndex === i
        );
        page.footerElementTemplate = this.footerElements.find(
          (el, i, arr) => pIndex === i
        );
        this.paginatedView.nativeElement.appendChild(page.divElement);
      })
    );
  }

  ngAfterViewChecked(): void {
    this.changeDedectionRef.detectChanges();
  }

  updatePages() {
    this.pages$.next([]);
    // clear paginated view
    this.paginatedView.nativeElement.innerHTML = "";

    // get a new page and add it to the paginated view
    let page: Page = new Page(
      this.pageSize,
      this.headerTemplate,
      this.footerTemplate
    );
    this.pages$.next(this.pages$.value.concat(page));

    this.paginatedView.nativeElement.appendChild(page.divElement);

    let lastEl: HTMLElement;
    // add content childrens to the page one by one
    this.elements.forEach(elRef => {
      const el = elRef.nativeElement;

      // if the content child height is larger than the size of the page
      // then do not add it to the page
      if (el.clientHeight > page.divElement.clientHeight) {
        return;
      }
      // add the child to the page
      page.addElements(el);

      // after adding the child if the page scroll hight becomes larger than the page height
      // then get a new page and append the child to the  new page
      if (page.divElement.scrollHeight > page.divElement.clientHeight) {
        page = new Page(this.pageSize, null, null);
        this.pages$.next(this.pages$.value.concat(page));
        this.paginatedView.nativeElement.appendChild(page.divElement);
        page.addElements(el);
      }
      lastEl = el;
    });

    //bring the element in to view port
    lastEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  getNewPage(): HTMLDivElement {
    const page = document.createElement("div");
    page.classList.add("page");
    page.classList.add(this.pageSize);
    return page;
  }
}
