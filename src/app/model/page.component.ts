import { Component, ElementRef, TemplateRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-page",
  templateUrl: "page.component.html",
  styleUrls: ["page.component.scss"]
})
export class PageComponent {
  constructor() {}
}

type PageSize = "A3" | "A4";
