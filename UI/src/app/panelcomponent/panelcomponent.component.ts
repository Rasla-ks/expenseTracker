import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MaterialModule } from '../material/material.module';
@Component({
  selector: 'panelcomponent',
  standalone: true,
  imports: [RouterModule, PageHeaderComponent, SideNavComponent,MaterialModule],
  templateUrl: './panelcomponent.component.html',
  styleUrl: './panelcomponent.component.scss'
})
export class PanelcomponentComponent {
  menuClicked: boolean = true;
}
