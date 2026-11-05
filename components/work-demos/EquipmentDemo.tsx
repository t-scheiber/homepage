"use client";

import { useState } from "react";
import { DemoHeading, DemoStatus } from "./Shared";

export default function EquipmentDemo() {
  const [postcode, setPostcode] = useState("10");
  const [uncertain, setUncertain] = useState(false);
  const [stage, setStage] = useState<
    "editing" | "blocked" | "ready" | "created" | "uncertain" | "reconciled"
  >("editing");
  const valid = /^\d{4}$/.test(postcode.trim());
  const locked = ["created", "uncertain", "reconciled"].includes(stage);

  return (
    <div className="demo-split">
      <div className="demo-main">
        <DemoHeading
          title="Prepare an equipment shipment"
          detail="Sample request EQUIP-104 · Alex Morgan"
        />
        <div className="demo-item">
          <svg
            viewBox="0 0 64 48"
            width="64"
            height="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <rect x="10" y="4" width="44" height="30" rx="3" />
            <path d="M4 38h56l-4 6H8l-4-6Z" />
          </svg>
          <div>
            <strong>14-inch laptop</strong>
            <span>One device · New starter</span>
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!locked) setStage(valid ? "ready" : "blocked");
          }}
        >
          <div className="demo-field">
            <label htmlFor="equipment-street">Delivery address</label>
            <input id="equipment-street" value="Example Street 12" readOnly />
            <small>Fictional address in Vienna, Austria</small>
          </div>
          <div className="demo-field">
            <label htmlFor="equipment-postcode">Postal code</label>
            <input
              id="equipment-postcode"
              value={postcode}
              onChange={(event) => {
                setPostcode(event.target.value);
                setStage("editing");
              }}
              disabled={locked}
              inputMode="numeric"
              maxLength={12}
              aria-invalid={stage === "blocked"}
              aria-describedby="postcode-help"
            />
            <small id="postcode-help">
              This sample needs a four-digit Austrian postal code.
            </small>
          </div>
          <div className="demo-actions">
            <button className="demo-button" type="submit" disabled={locked}>
              Check address
            </button>
            <button
              className="demo-link-button"
              type="button"
              disabled={locked}
              onClick={() => {
                setPostcode("1010");
                setStage("editing");
              }}
            >
              Use valid sample
            </button>
          </div>
        </form>
      </div>
      <div className="demo-aside">
        <h4>Shipment state</h4>
        <ol className="demo-steps">
          <li data-complete={stage === "ready" || locked}>
            <span>Address checked</span>
          </li>
          <li data-complete={stage === "created" || stage === "reconciled"}>
            <span>Label confirmed</span>
          </li>
        </ol>
        <label className="demo-check">
          <input
            type="checkbox"
            checked={uncertain}
            disabled={locked}
            onChange={(event) => setUncertain(event.target.checked)}
          />
          Simulate an uncertain carrier response
        </label>
        {stage === "editing" && (
          <DemoStatus>Check the address before preparing a label.</DemoStatus>
        )}
        {stage === "blocked" && (
          <DemoStatus tone="warning">
            Shipment blocked. The postal code must contain four digits. No label
            was requested.
          </DemoStatus>
        )}
        {stage === "ready" && (
          <DemoStatus tone="success">
            Address accepted for this demo. The sample label can be prepared.
          </DemoStatus>
        )}
        {stage === "created" && (
          <DemoStatus tone="success">
            Sample label prepared. Further label creation is locked to avoid
            duplicates.
          </DemoStatus>
        )}
        {stage === "uncertain" && (
          <DemoStatus tone="warning">
            Carrier outcome unknown. Do not request another label. Reconcile the
            original attempt first.
          </DemoStatus>
        )}
        {stage === "reconciled" && (
          <DemoStatus tone="success">
            Existing sample label found. The original attempt is confirmed; no
            second label was created.
          </DemoStatus>
        )}
        <button
          className="demo-button"
          disabled={stage !== "ready"}
          onClick={() => setStage(uncertain ? "uncertain" : "created")}
        >
          Prepare demo label
        </button>
        {stage === "uncertain" && (
          <button
            className="demo-secondary"
            onClick={() => setStage("reconciled")}
          >
            Reconcile sample response
          </button>
        )}
      </div>
    </div>
  );
}
