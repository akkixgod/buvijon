import { Fragment } from "react";

export function BrandText({ children }: { children: string }) {
  const parts = children.split("Buvijon");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <strong className="brand-inline">Buvijon</strong>}
        </Fragment>
      ))}
    </>
  );
}
