// Cross-page smooth scroll: when a nav link points at a section on another
// page (e.g. clicking "How" from /features), we stash the target hash here,
// navigate, and let <ScrollOnLoad> smooth-scroll to it once the destination
// page has mounted — instead of the browser hard-jumping to the anchor.

const KEY = "buvijon_pending_scroll";

export function setPendingScroll(hash: string): void {
  try {
    sessionStorage.setItem(KEY, hash);
  } catch {
    /* sessionStorage unavailable — fall back to a hard jump */
  }
}

export function takePendingScroll(): string | null {
  try {
    const v = sessionStorage.getItem(KEY);
    if (v) sessionStorage.removeItem(KEY);
    return v;
  } catch {
    return null;
  }
}
