"use client";

import Link from "next/link";
import { useT } from "@/components/I18nProvider";

export function ProductCta() {
  const t = useT();
  return (
    <div className="product-cta">
      <p className="product-cta__lead">{t.common.productCtaLead}</p>
      <Link href="/waitlist" className="btn-primary">
        {t.nav.joinWaitlist}
      </Link>
    </div>
  );
}
