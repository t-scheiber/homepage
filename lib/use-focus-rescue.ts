"use client";

import { useEffect, type RefObject } from "react";

const BUTTONS = "button:not(:disabled)";
const STATUS = "[data-focus-target]";
const CONTROLS =
  "input:not(:disabled):not([type=hidden]), select:not(:disabled), textarea:not(:disabled)";

// Demo actions often replace or disable themselves ("Prepare label" becomes
// "Simulate a carrier response"). Browsers then drop keyboard focus to <body>
// without a reliable event. After each change inside the demo, this moves
// focus to the nearest next action, or to the status line.
export function useFocusRescue(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let last: HTMLElement | null = null;
    let ancestors: HTMLElement[] = [];
    const onFocusIn = (event: FocusEvent) => {
      last = event.target as HTMLElement;
      ancestors = [];
      for (let node = last.parentElement; node && root.contains(node); node = node.parentElement)
        ancestors.push(node);
    };
    const rescue = () => {
      if (!last) return;
      const active = document.activeElement;
      const unusable = !last.isConnected || (last as HTMLButtonElement).disabled;
      // Chrome moves focus to <body> when the focused button is disabled;
      // some engines leave it on the disabled button. Treat both as lost.
      const lostFocus = !active || active === document.body || active === last;
      if (!lostFocus || !unusable) return;
      const live = ancestors.filter((node) => node.isConnected);
      const search = (selector: string) => {
        for (const node of live) {
          const found = node.querySelector<HTMLElement>(selector);
          if (found) return found;
        }
        return root.querySelector<HTMLElement>(selector);
      };
      // A finished action should focus its nearby result before a distant
      // toolbar action such as Reset. Still prefer a next action in that group.
      const nearby = live
        .map((node) => node.querySelector<HTMLElement>(BUTTONS) ?? node.querySelector<HTMLElement>(STATUS))
        .find(Boolean);
      const next = nearby ?? search(BUTTONS) ?? search(STATUS) ?? search(CONTROLS);
      last = null;
      next?.focus();
    };
    const observer = new window.MutationObserver(rescue);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["disabled"],
    });
    root.addEventListener("focusin", onFocusIn);
    return () => {
      observer.disconnect();
      root.removeEventListener("focusin", onFocusIn);
    };
  }, [rootRef]);
}
