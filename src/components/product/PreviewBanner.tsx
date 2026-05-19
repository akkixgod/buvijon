"use client";

import { useT } from "@/components/I18nProvider";

export function PreviewBanner() {
  const t = useT();
  return (
    <div className="preview-banner" role="status">
      <span className="preview-banner__dot" aria-hidden />
      {t.common.preview}
    </div>
  );
}
