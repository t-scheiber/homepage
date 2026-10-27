"use client";

import { useState } from "react";
import { DemoHeading, DemoStatus } from "./Shared";

export default function ConnectionsDemo() {
  const [state, setState] = useState<"disconnected" | "connected" | "revoked">(
    "disconnected",
  );
  const [synced, setSynced] = useState(false);
  return (
    <div className="demo-split">
      <div className="demo-main">
        <DemoHeading
          title="Manage a workspace connection"
          detail="Example provider · Knowledge workspace"
        />
        <div className="demo-connection">
          <span className="demo-connection-icon" aria-hidden="true">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M7 8h10M7 12h10M7 16h6" />
            </svg>
          </span>
          <div>
            <strong>Orion knowledge space</strong>
            <p>Fictional provider and consent screen</p>
          </div>
          <span className="demo-state-label">
            {state === "connected"
              ? "Connected"
              : state === "revoked"
                ? "Revoked"
                : "Not connected"}
          </span>
        </div>
        <dl className="demo-facts">
          <div>
            <dt>Example scope</dt>
            <dd>Read selected pages</dd>
          </div>
          <div>
            <dt>Credential</dt>
            <dd>Never displayed in this demo</dd>
          </div>
        </dl>
        {state !== "connected" ? (
          <button
            className="demo-button"
            onClick={() => {
              setState("connected");
              setSynced(false);
            }}
          >
            Connect sample workspace
          </button>
        ) : (
          <button
            className="demo-secondary"
            onClick={() => {
              setState("revoked");
              setSynced(false);
            }}
          >
            Revoke sample connection
          </button>
        )}
        <p className="demo-caption">
          This is an interaction model, not a real OAuth sign-in or consent
          grant.
        </p>
      </div>
      <div className="demo-aside">
        <h4>A task depends on this access</h4>
        <p>Read a small sample page list through the connection.</p>
        <button
          className="demo-button"
          disabled={state !== "connected"}
          onClick={() => setSynced(true)}
        >
          Run sample sync
        </button>
        <DemoStatus
          tone={
            state === "revoked" ? "warning" : synced ? "success" : "neutral"
          }
        >
          {state === "revoked"
            ? "Connection revoked. The sync is disabled and the previous sample result has been cleared."
            : synced
              ? "Sample sync complete. Three fictional page titles are available below."
              : state === "connected"
                ? "Connection available. You can run the sample task."
                : "Connect the workspace to enable this task."}
        </DemoStatus>
        {synced && (
          <ul className="demo-document-list">
            <li>Getting started</li>
            <li>Project notes</li>
            <li>Release checklist</li>
          </ul>
        )}
      </div>
    </div>
  );
}
