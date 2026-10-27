"use client";

import { useState } from "react";
import { DemoHeading, DemoStatus } from "./Shared";

export default function AccessDemo() {
  const [resource, setResource] = useState("Project Orion / Design handoff");
  const [permission, setPermission] = useState("Read");
  const [state, setState] = useState<
    "draft" | "pending" | "approved" | "rejected"
  >("draft");
  return (
    <div className="demo-split">
      <div className="demo-main">
        <DemoHeading
          title="Request access for a partner"
          detail="Example request · External collaboration"
        />
        <div className="demo-field">
          <label htmlFor="access-resource">Shared resource</label>
          <select
            id="access-resource"
            value={resource}
            disabled={state !== "draft"}
            onChange={(event) => setResource(event.target.value)}
          >
            <option>Project Orion / Design handoff</option>
            <option>Project Cedar / Partner documents</option>
          </select>
        </div>
        <div className="demo-field">
          <label htmlFor="access-guest">Guest</label>
          <input id="access-guest" value="jamie@partner.example" readOnly />
        </div>
        <fieldset className="demo-options" disabled={state !== "draft"}>
          <legend>Requested permission</legend>
          {["Read", "Edit"].map((value) => (
            <label key={value} data-selected={permission === value}>
              <input
                type="radio"
                name="access-permission"
                checked={permission === value}
                onChange={() => setPermission(value)}
              />
              {value}
            </label>
          ))}
        </fieldset>
        <button
          className="demo-button"
          disabled={state !== "draft"}
          onClick={() => setState("pending")}
        >
          Submit sample request
        </button>
      </div>
      <div className="demo-aside">
        <h4>Approval trail</h4>
        <ol className="demo-steps">
          <li data-complete={state !== "draft"}>Request submitted</li>
          <li data-complete={state === "approved" || state === "rejected"}>
            Decision recorded
          </li>
          <li data-complete={state === "approved"}>Access granted</li>
        </ol>
        <DemoStatus
          tone={
            state === "approved"
              ? "success"
              : state === "rejected"
                ? "warning"
                : "neutral"
          }
        >
          {state === "draft"
            ? "No access has been requested."
            : state === "pending"
              ? "Pending approval. Submitting the form has not granted any access."
              : state === "approved"
                ? `Sample approval recorded: ${permission.toLowerCase()} access to ${resource}. No real permissions changed.`
                : "Sample request rejected. Access remains ungranted."}
        </DemoStatus>
        {state === "pending" && (
          <div className="demo-actions">
            <button
              className="demo-button"
              onClick={() => setState("approved")}
            >
              Simulate approval
            </button>
            <button
              className="demo-secondary"
              onClick={() => setState("rejected")}
            >
              Simulate rejection
            </button>
          </div>
        )}
        <p className="demo-caption">
          You play the requester and reviewer here. Those are separate
          responsibilities in the workflow.
        </p>
      </div>
    </div>
  );
}
