import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-other-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Other Page</h2>
    <p>
      This is a placeholder page. Navigate here from the Grid Page, then
      navigate back to trigger the RouteReuseStrategy detach/reattach cycle.
    </p>
    <p>
      When you go back to "Grid Page", the <code>ids-data-grid</code> component
      will be reattached from the stored route handle, triggering
      <code>connectedCallback</code> on the web component — which breaks
      pagination.
    </p>
  `,
})
export class OtherPageComponent {}
