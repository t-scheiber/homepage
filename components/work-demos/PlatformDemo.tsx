"use client";

import { useState } from "react";
import { DemoHeading, DemoStatus } from "./Shared";

export default function PlatformDemo() {
  const [failing, setFailing] = useState(true);
  const [checked, setChecked] = useState(false);
  const [approved, setApproved] = useState(false);
  const [deployed, setDeployed] = useState(false);
  return (
    <div className="demo-split">
      <div className="demo-main">
        <DemoHeading
          title="Follow a change to a demo deployment"
          detail="Fictional repository · Course handbook"
        />
        <div className="demo-change">
          <span>Proposed change</span>
          <strong>Clarify the setup instructions</strong>
          <code>feature/setup-guide</code>
        </div>
        <label className="demo-check">
          <input
            type="checkbox"
            checked={failing}
            disabled={deployed}
            onChange={(event) => {
              setFailing(event.target.checked);
              setChecked(false);
              setApproved(false);
            }}
          />
          Include a failing link check
        </label>
        <button
          className="demo-button"
          disabled={deployed}
          onClick={() => {
            setChecked(true);
            setApproved(false);
          }}
        >
          Run sample checks
        </button>
        {checked && (
          <ol className="demo-run-list" aria-label="Release checks">
            <li data-state="done">
              <span className="demo-run-indicator" aria-hidden="true" />
              <div>
                <strong>Build</strong>
                <span>Sample build passed</span>
              </div>
            </li>
            <li data-state={failing ? "failed" : "done"}>
              <span className="demo-run-indicator" aria-hidden="true" />
              <div>
                <strong>Link check</strong>
                <span>
                  {failing
                    ? "Broken example link · Repair required"
                    : "Example links passed"}
                </span>
              </div>
            </li>
          </ol>
        )}
      </div>
      <div className="demo-aside">
        <h4>Review and release</h4>
        <label className="demo-check">
          <input
            type="checkbox"
            checked={approved}
            disabled={!checked || failing || deployed}
            onChange={(event) => setApproved(event.target.checked)}
          />
          Approve the sample change after checks pass
        </label>
        <DemoStatus
          tone={
            deployed ? "success" : checked && failing ? "warning" : "neutral"
          }
        >
          {deployed
            ? "Demo deployment completed. No repository or hosting service was changed."
            : checked && failing
              ? "Deployment held. Repair the failing sample and run the checks again."
              : checked
                ? "Checks passed. Review is a separate gate before deployment."
                : "Run the checks to see which gate needs attention."}
        </DemoStatus>
        <button
          className="demo-button"
          disabled={!checked || failing || !approved || deployed}
          onClick={() => setDeployed(true)}
        >
          Deploy the sample
        </button>
        <p className="demo-caption">
          An illustrative release flow. The underlying Git and deployment
          platform remains a pilot.
        </p>
      </div>
    </div>
  );
}
