import { BehaviorSubject } from "rxjs";

export class Page {
  public pageSize: PageSize;

  private elementsSub: BehaviorSubject<HTMLElement[]>;

  get elementsToRender_() {
    return ["header", this.elementsSub.value, "footer"];
  }

  divElement: HTMLDivElement;

  constructor(pageSize: PageSize, elements?: HTMLElement[]) {
    this.pageSize = pageSize;
    this.elementsSub = new BehaviorSubject(elements || []);
    this.divElement = document.createElement("div");
    this.divElement.classList.add("page");
    this.divElement.classList.add(this.pageSize);

    this.elementsSub.subscribe(els =>
      els.forEach(el => this.divElement.append(el))
    );
  }

  addElements(...elements: HTMLElement[]) {
    this.elementsSub.next(this.elementsSub.value.concat(...elements));
  }
}

type PageSize = "A3" | "A4";
