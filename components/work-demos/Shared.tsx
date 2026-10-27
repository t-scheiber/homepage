import type { ReactNode } from "react";

export function DemoStatus({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning";
}) {
  return (
    <div
      className={`demo-status demo-status-${tone}`}
      role="status"
      aria-atomic="true"
    >
      {children}
    </div>
  );
}

export function DemoHeading({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className="demo-heading">
      <h3>{title}</h3>
      <p>{detail}</p>
    </div>
  );
}
