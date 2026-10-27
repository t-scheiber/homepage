"use client";

import { useState } from "react";
import { DemoHeading, DemoStatus } from "./Shared";

export default function LifecycleDemo() {
  const [scenario, setScenario] = useState("returning");
  const [failure, setFailure] = useState(true);
  const [ran, setRan] = useState(false);
  const future = scenario === "future";
  const leaving = scenario === "leaving";
  const steps = future
    ? [
        ["Read employee lifecycle", "Future start confirmed", "done"],
        ["Evaluate removal event", "Not a confirmed departure", "held"],
        ["Preserve equipment preparation", "No offboarding changes", "done"],
      ]
    : [
        [
          "Read employee lifecycle",
          leaving ? "Departure confirmed" : "Return from leave confirmed",
          "done",
        ],
        [
          "Update inventory record",
          leaving ? "Record deactivated" : "Record reactivated",
          "done",
        ],
        [
          "Coordinate equipment",
          leaving
            ? "Return invitation queued"
            : "Existing preparation preserved",
          "done",
        ],
        [
          "Directory / mailbox step",
          failure
            ? "Service unavailable · Needs follow-up"
            : "Sample operation confirmed",
          failure ? "failed" : "done",
        ],
      ];
  return (
    <div className="demo-split">
      <div className="demo-main">
        <DemoHeading
          title="Inspect a lifecycle run"
          detail="Alex Morgan · Fictional employee record"
        />
        <div className="demo-field">
          <label htmlFor="lifecycle-event">Example event</label>
          <select
            id="lifecycle-event"
            value={scenario}
            onChange={(event) => {
              setScenario(event.target.value);
              setRan(false);
            }}
          >
            <option value="returning">Returning from temporary leave</option>
            <option value="leaving">Confirmed departure</option>
            <option value="future">Group removal before a future start</option>
          </select>
        </div>
        <label className="demo-check">
          <input
            type="checkbox"
            checked={failure}
            disabled={future}
            onChange={(event) => {
              setFailure(event.target.checked);
              setRan(false);
            }}
          />
          Simulate a directory outage
        </label>
        <button className="demo-button" onClick={() => setRan(true)}>
          Run sample workflow
        </button>
        {ran && (
          <ol className="demo-run-list" aria-label="Workflow result">
            {steps.map(([title, detail, state]) => (
              <li key={title} data-state={state}>
                <span className="demo-run-indicator" aria-hidden="true" />
                <div>
                  <strong>{title}</strong>
                  <span>{detail}</span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="demo-aside">
        <h4>Completion is explicit</h4>
        {!ran ? (
          <DemoStatus>
            Run the example to inspect the result of each independent step.
          </DemoStatus>
        ) : future ? (
          <DemoStatus tone="success">
            Preparation preserved. A group removal alone does not establish that
            someone is leaving.
          </DemoStatus>
        ) : failure ? (
          <>
            <DemoStatus tone="warning">
              Partially completed. Inventory work is preserved, but the
              directory step needs follow-up. The run is not reported as fully
              successful.
            </DemoStatus>
            <button
              className="demo-secondary"
              onClick={() => {
                setFailure(false);
                setRan(true);
              }}
            >
              Retry with service available
            </button>
          </>
        ) : (
          <DemoStatus tone="success">
            All sample steps confirmed. Retrying did not repeat the completed
            equipment work.
          </DemoStatus>
        )}
        <p className="demo-caption">
          This illustrates the control flow, not an actual employee operation.
        </p>
      </div>
    </div>
  );
}
