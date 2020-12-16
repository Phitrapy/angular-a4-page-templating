import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginatedViewComponent } from "./paginated-view.component";

@NgModule({
  imports: [CommonModule],
  declarations: [PaginatedViewComponent],
  exports: [PaginatedViewComponent]
})
export class PaginatedViewModule {}
