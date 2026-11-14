"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

// One live region per demo frame stays mounted (see WorkShowcase). Each visible
// status publishes its text there, so screen readers announce every change even
// when the visible status element itself is newly rendered.
export const DemoAnnouncer = createContext<(message: string) => void>(() => {});

export function DemoStatus({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const announce = useContext(DemoAnnouncer);
  const text = typeof children === "string" ? children : undefined;
  useEffect(() => {
    const message = ref.current?.textContent?.trim();
    if (message) announce(message);
  }, [announce, text, children]);
  return (
    <div
      ref={ref}
      className={`demo-status demo-status-${tone}`}
      tabIndex={-1}
      data-focus-target=""
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
