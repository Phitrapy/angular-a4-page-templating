import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  elements = ["block", "text", "form", "table"];

  onBtnAddElement(el: string): void {
    this.elements = [...this.elements, el];
  }

  onReset() {
    this.elements = ["block", "text", "form", "table"];
  }
}
