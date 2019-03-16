import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { SharedComponentModule } from '@bionic/shared-component';
import { NewsViewComponent } from './news-view/news-view.component';
import { NewsFormComponent } from './news-form/news-form.component';
import { NewsApiService } from './news-api.service';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  declarations: [NewsFormComponent, NewsViewComponent],
  imports: [CommonModule, NewsRoutingModule, SharedComponentModule, TabModule],
  providers: [NewsApiService]
})
export class NewsModule {}
