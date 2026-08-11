import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1>IDS DataGrid Pagination Bug Reproduction</h1>

    <div class="bug-info">
      <h3>
        Bug: ids-data-grid client-side pagination breaks after
        disconnect/reconnect
      </h3>
      <p>
        <strong>Steps to reproduce:</strong> Click "Grid Page" to see pagination
        working. Then click "Other Page" and come back to "Grid Page". The pager
        buttons will no longer work.
      </p>
      <p><strong>IDS version:</strong> ids-enterprise-wc&#64;1.16.12</p>
    </div>

    <nav>
      <a routerLink="/grid" routerLinkActive="active">Grid Page</a>
      <a routerLink="/other" routerLinkActive="active">Other Page</a>
    </nav>

    <router-outlet />
  `,
})
export class AppComponent {}
