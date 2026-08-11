import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

/**
 * Custom RouteReuseStrategy that detaches and reattaches components
 * when their route data includes `saveComponent: true`.
 *
 * This simulates what Sales Hub Frontend does with Angular's route reuse,
 * triggering disconnectedCallback/connectedCallback on web components.
 */
@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  readonly #storedRoutes = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data['saveComponent'] === true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const key = this.#getRouteKey(route);
    if (key) {
      this.#storedRoutes.set(key, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = this.#getRouteKey(route);
    return !!key && this.#storedRoutes.has(key);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const key = this.#getRouteKey(route);
    if (!key) return null;
    return this.#storedRoutes.get(key) ?? null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot,
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  #getRouteKey(route: ActivatedRouteSnapshot): string | null {
    return route.routeConfig?.path ?? null;
  }
}
