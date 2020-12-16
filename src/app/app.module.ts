import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { PaginatedViewModule } from "./paginated-view/paginated-view.module";
import { TableComponent } from "./table/table.component";

@NgModule({
  imports: [BrowserModule, FormsModule, PaginatedViewModule],
  declarations: [AppComponent, HelloComponent, TableComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
