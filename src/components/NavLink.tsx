"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { forwardRef, MouseEvent, ReactNode, CSSProperties } from "react";

type Props = {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const NavLink = forwardRef<HTMLAnchorElement, Props>(function NavLink(
  { href, className, style, children, onClick },
  ref,
) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const url = new URL(href, window.location.origin);
    const samePath = url.pathname === pathname;
    const lenis = typeof window !== "undefined" ? window.__lenis : undefined;

    if (samePath && url.hash) {
      e.preventDefault();
      const target = document.querySelector(url.hash) as HTMLElement | null;
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.1, easing: easeOutCubic });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (samePath) {
      e.preventDefault();
      if (lenis) lenis.scrollTo(0, { duration: 0.8, easing: easeOutCubic });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    e.preventDefault();
    let navigated = false;
    const finish = () => {
      if (navigated) return;
      navigated = true;
      router.push(href);
    };

    if (lenis && window.scrollY > 12) {
      lenis.scrollTo(0, {
        duration: 0.55,
        easing: easeOutCubic,
        onComplete: finish,
      });
      // Safety net if onComplete is preempted by a fresh scroll.
      window.setTimeout(finish, 620);
    } else {
      finish();
    }
  };

  return (
    <Link href={href} ref={ref} onClick={handleClick} className={className} style={style}>
      {children}
    </Link>
  );
});
