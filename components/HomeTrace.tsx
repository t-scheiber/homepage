"use client";

import { useId, useState } from "react";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";

type Stage = "editing" | "blocked" | "ready" | "labelled" | "uncertain" | "reconciled";

const messages: Record<Stage, { tone: "neutral" | "warning" | "success"; text: string }> = {
  editing: { tone: "neutral", text: "Check the postal code before a label can be bought." },
  blocked: { tone: "warning", text: "Shipment blocked. An Austrian postal code has four digits. No label was requested." },
  ready: { tone: "success", text: "Address accepted. The sample label can be prepared." },
  labelled: { tone: "success", text: "Sample label prepared. Further labels are locked for this shipment." },
  uncertain: { tone: "warning", text: "Carrier response unknown. Don't buy another label. Reconcile first." },
  reconciled: { tone: "success", text: "Existing label found. No second label was created." },
};

// A pocket version of the equipment demo on /workprojects. Fictional data, no network.
export default function HomeTrace() {
  const [code, setCode] = useState("10");
  const [stage, setStage] = useState<Stage>("editing");
  const id = useId();
  const message = messages[stage];
  const locked = stage === "labelled" || stage === "uncertain" || stage === "reconciled";

  return (
    <div className="home-trace">
      <p className="home-trace-title">
        <span className="home-trace-dot" aria-hidden="true" />
        Try it: equipment handover
      </p>
      <form
        className="home-trace-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!locked) setStage(/^\d{4}$/.test(code.trim()) ? "ready" : "blocked");
        }}
      >
        <label htmlFor={`${id}-code`}>Postal code</label>
        <div className="home-trace-row">
          <input
            id={`${id}-code`}
            inputMode="numeric"
            autoComplete="off"
            value={code}
            disabled={locked}
            aria-invalid={stage === "blocked"}
            aria-describedby={`${id}-status`}
            onChange={(event) => {
              setCode(event.target.value);
              setStage("editing");
            }}
          />
          <button type="submit" disabled={locked}>
            Check address
          </button>
        </div>
      </form>
      <p
        id={`${id}-status`}
        key={stage}
        className={`home-trace-status home-trace-${message.tone}`}
        role="status"
        aria-atomic="true"
      >
        {message.text}
      </p>
      <div className="home-trace-actions">
        {stage === "ready" && (
          <button type="button" onClick={() => setStage("labelled")}>
            Prepare sample label
          </button>
        )}
        {stage === "labelled" && (
          <button type="button" onClick={() => setStage("uncertain")}>
            Simulate an unclear carrier response
          </button>
        )}
        {stage === "uncertain" && (
          <button type="button" onClick={() => setStage("reconciled")}>
            Reconcile
          </button>
        )}
        {(stage === "reconciled" || stage === "blocked") && (
          <button
            type="button"
            className="home-trace-quiet"
            onClick={() => {
              setCode(stage === "blocked" ? "1020" : "10");
              setStage("editing");
            }}
          >
            {stage === "blocked" ? "Use a valid sample" : "Start again"}
          </button>
        )}
      </div>
      <p className="home-trace-footer">
        Fictional data, runs in your browser.{" "}
        <Link href="/workprojects#equipment">
          Open the full demo <ArrowIcon />
        </Link>
      </p>
    </div>
  );
}
