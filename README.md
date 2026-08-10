# IDS DataGrid Pagination Bug Reproduction

## Bug Summary

`ids-data-grid` with `pagination="client-side"` loses pagination functionality after the element is disconnected from the DOM and reconnected (e.g., via Angular's `RouteReuseStrategy`).

**IDS Version:** `ids-enterprise-wc@1.16.12`

## How to Reproduce

### Method 1: Route Navigation (RouteReuseStrategy)

1. Open the app — you land on the **Grid Page**
2. Verify pagination works: click the "Next" button in the pager — rows change
3. Click **"Other Page"** in the navigation
4. Click **"Grid Page"** to return
5. **Bug:** Try clicking "Next" in the pager — it no longer works. The grid stays on page 1.

### Method 2: Manual Detach/Reattach

1. Open the app — you land on the **Grid Page**
2. Verify pagination works: click "Next" — rows change
3. Click the **"Detach Grid"** button
4. Click the **"Reattach Grid"** button
5. **Bug:** Try clicking "Next" in the pager — it no longer works.

## Root Cause

The `ids-pager` sub-component inside `ids-data-grid` establishes event listener bindings to the grid **only during initial render**. When `disconnectedCallback` fires (element removed) and then `connectedCallback` fires (element re-inserted), the pager's internal event delegation to the grid is **not re-established**.

### Evidence

- `grid.datasource.originalData.length` = correct (data retained)
- `grid.pager.total` = `null` after reconnect
- `grid.pager.pageNumber` stays at 1 after clicking next
- Clicking inner `ids-button` inside `ids-pager-button[next]` shadow DOM has no effect
- Reassigning `grid.data`, `grid.columns`, toggling `pagination` attribute, calling `grid.redrawBody()` — none restore pagination

## Expected Behavior

Pagination continues to work after the grid element is removed from and re-added to the DOM.

## Actual Behavior

Pager buttons (next, previous, last, first) have no effect. Grid stays on page 1.

## Workaround

None found.

## Context

This commonly occurs in Angular apps using `RouteReuseStrategy` with `saveComponent: true`, React portals, or any SPA with view caching that detaches/reattaches DOM elements.

## Running Locally

```bash
npm install
npm start
```

## StackBlitz

To run on StackBlitz, upload this project or use the StackBlitz import-from-GitHub feature.
