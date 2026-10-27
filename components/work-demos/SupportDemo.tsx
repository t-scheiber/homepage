"use client";

import { useState } from "react";
import { DemoHeading, DemoStatus } from "./Shared";

export default function SupportDemo() {
  const [source, setSource] = useState("active");
  const [draft, setDraft] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [generated, setGenerated] = useState(false);
  function generate() {
    setGenerated(true);
    setReviewed(false);
    setAccepted(false);
    setDraft(
      source === "active"
        ? "Hi Alex, please check which audio output is selected in your meeting settings. In a similar resolved case, selecting the headset instead of the display restored the audio. If that does not help, tell us which output is selected and we can investigate further."
        : "Hi Alex, could you tell us which audio output is selected in your meeting settings and whether sound works in another application? That will help us narrow down the issue.",
    );
  }
  return (
    <div className="demo-split">
      <div className="demo-main">
        <DemoHeading
          title="Review a support reply"
          detail="Fictional ticket IT-204 · Audio in a meeting"
        />
        <blockquote className="demo-message">
          “My headset is connected, but I cannot hear anyone in the meeting.”
          <footer>Alex Morgan · Example request</footer>
        </blockquote>
        <button className="demo-button" onClick={generate}>
          Generate sample draft
        </button>
        <p className="demo-caption">
          A deterministic example. No AI service is called.
        </p>
        {generated && (
          <div className="demo-field">
            <label htmlFor="support-draft">Editable reply draft</label>
            <textarea
              id="support-draft"
              value={draft}
              rows={6}
              onChange={(event) => {
                setDraft(event.target.value);
                setReviewed(false);
                setAccepted(false);
              }}
            />
            <label className="demo-check">
              <input
                type="checkbox"
                checked={reviewed}
                onChange={(event) => setReviewed(event.target.checked)}
              />
              I have reviewed this sample reply
            </label>
            <button
              className="demo-button"
              disabled={!reviewed || !draft.trim() || accepted}
              onClick={() => setAccepted(true)}
            >
              Accept reviewed draft
            </button>
          </div>
        )}
        {accepted && (
          <DemoStatus tone="success">
            Demo draft accepted for the reply editor. Nothing has been sent.
          </DemoStatus>
        )}
      </div>
      <div className="demo-aside">
        <h4>Source matters</h4>
        <div className="demo-field">
          <label htmlFor="support-source">State of the prior case</label>
          <select
            id="support-source"
            value={source}
            onChange={(event) => {
              setSource(event.target.value);
              setGenerated(false);
              setDraft("");
              setReviewed(false);
              setAccepted(false);
            }}
          >
            <option value="active">Resolved · Source unchanged</option>
            <option value="reopened">Reopened · Fix no longer eligible</option>
          </select>
        </div>
        <div className="demo-evidence">
          <strong>Prior case IT-108</strong>
          <p>
            “Selected the headset as the meeting output. Audio worked again.”
          </p>
          <span>Fictional staff resolution</span>
        </div>
        <DemoStatus tone={source === "active" ? "success" : "warning"}>
          {source === "active"
            ? "This source can inform a draft. It does not prove the same fix applies to the current request."
            : "This source is excluded. Generate another draft to see it ask for more information instead."}
        </DemoStatus>
      </div>
    </div>
  );
}
