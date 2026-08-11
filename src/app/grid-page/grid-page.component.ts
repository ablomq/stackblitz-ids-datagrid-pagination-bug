import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  viewChild,
} from '@angular/core';

/**
 * Generates sample data rows for the grid.
 */
function generateData(count: number): Record<string, string | number>[] {
  const data: Record<string, string | number>[] = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      productName: `Product ${i}`,
      quantity: Math.floor(Math.random() * 100) + 1,
      price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
      status: i % 3 === 0 ? 'Inactive' : 'Active',
    });
  }
  return data;
}

@Component({
  selector: 'app-grid-page',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>IDS DataGrid with Client-Side Pagination</h2>

    <p>
      This grid has <strong>100 rows</strong> with
      <strong>page-size="10"</strong>. Pagination should show 10 pages.
    </p>

    <div class="manual-test">
      <h4>Manual Detach/Reattach Test</h4>
      <p>
        Click "Detach" to remove the grid from the DOM, then "Reattach" to put
        it back. After reattachment, pagination will be broken.
      </p>
      <button (click)="detachGrid()">Detach Grid</button>
      <button (click)="reattachGrid()">Reattach Grid</button>
    </div>

    <div #gridContainer>
      <ids-data-grid
        #dataGrid
        id="pagination-bug-grid"
        pagination="client-side"
        page-size="10"
        label="Bug Reproduction Grid"
      ></ids-data-grid>
    </div>
  `,
})
export class GridPageComponent implements AfterViewInit {
  readonly dataGrid = viewChild<ElementRef>('dataGrid');
  readonly gridContainer = viewChild<ElementRef>('gridContainer');

  #detachedGrid: HTMLElement | null = null;

  ngAfterViewInit(): void {
    const grid = this.dataGrid()?.nativeElement;
    if (!grid) return;

    grid.columns = [
      { id: 'id', name: 'ID', field: 'id', width: 80 },
      {
        id: 'productName',
        name: 'Product Name',
        field: 'productName',
        width: 200,
      },
      { id: 'quantity', name: 'Quantity', field: 'quantity', width: 100 },
      { id: 'price', name: 'Price', field: 'price', width: 120 },
      { id: 'status', name: 'Status', field: 'status', width: 100 },
    ];

    grid.data = generateData(100);
  }

  detachGrid(): void {
    const container = this.gridContainer()?.nativeElement;
    const grid = this.dataGrid()?.nativeElement;
    if (container && grid && grid.parentNode) {
      this.#detachedGrid = grid;
      container.removeChild(grid);
      console.log(
        '[BUG REPRO] Grid detached from DOM (disconnectedCallback fired)',
      );
    }
  }

  reattachGrid(): void {
    const container = this.gridContainer()?.nativeElement;
    if (container && this.#detachedGrid) {
      container.appendChild(this.#detachedGrid);
      this.#detachedGrid = null;
      console.log(
        '[BUG REPRO] Grid reattached to DOM (connectedCallback fired)',
      );
      console.log(
        '[BUG REPRO] Try clicking pagination buttons — they will not work.',
      );
    }
  }
}
