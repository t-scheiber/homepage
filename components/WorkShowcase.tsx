"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { DemoAnnouncer } from "./work-demos/Shared";
import { useFocusRescue } from "@/lib/use-focus-rescue";
import { workProjects, type DemoId } from "@/lib/work-projects";
import EquipmentDemo from "./work-demos/EquipmentDemo";
import SupportDemo from "./work-demos/SupportDemo";
import LifecycleDemo from "./work-demos/LifecycleDemo";
import SchedulerDemo from "./work-demos/SchedulerDemo";
import AccessDemo from "./work-demos/AccessDemo";
import ConnectionsDemo from "./work-demos/ConnectionsDemo";
import TrainingDemo from "./work-demos/TrainingDemo";
import PlatformDemo from "./work-demos/PlatformDemo";

const demos = {
  equipment: EquipmentDemo,
  support: SupportDemo,
  lifecycle: LifecycleDemo,
  scheduler: SchedulerDemo,
  access: AccessDemo,
  connections: ConnectionsDemo,
  training: TrainingDemo,
  platform: PlatformDemo,
};
const getServerSelection = (): DemoId => "equipment";
function getSelection(): DemoId | null {
  return (
    workProjects.find((project) => `#${project.id}` === window.location.hash)
      ?.id ?? null
  );
}
function subscribe(notify: () => void) {
  window.addEventListener("hashchange", notify);
  window.addEventListener("popstate", notify);
  return () => {
    window.removeEventListener("hashchange", notify);
    window.removeEventListener("popstate", notify);
  };
}

export default function WorkShowcase() {
  const hashSelection = useSyncExternalStore(
    subscribe,
    getSelection,
    getServerSelection,
  );
  const [selection, setSelection] = useState<DemoId>("equipment");
  const [resetCount, setResetCount] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState("");
  const announce = useCallback((message: string) => setAnnouncement(message), []);
  useFocusRescue(frameRef);
  // A shared link such as /workprojects#platform lands on the demo itself.
  useEffect(() => {
    if (!getSelection()) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sectionRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);
  // Section anchors must not discard the currently open demo or its draft.
  if (hashSelection && hashSelection !== selection) setSelection(hashSelection);
  const project = workProjects.find((candidate) => candidate.id === selection)!;
  const Demo = demos[selection];
  function select(id: string) {
    // One history entry per demo, so Back steps through the demos visited.
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    window.dispatchEvent(new window.Event("hashchange"));
    // Move focus to the new demo so keyboard and screen-reader users follow it.
    window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 0);
  }
  return (
    <section
      className="work-showcase"
      aria-label="Interactive project demonstrations"
    >
      <div className="work-selector">
        <p className="work-selector-label">Choose a workflow</p>
        <nav className="work-selector-list" aria-label="Demo projects">
          {workProjects.map((item) => (
            <button
              key={item.id}
              aria-pressed={selection === item.id}
              onClick={() => select(item.id)}
            >
              <span>{item.shortTitle}</span>
              <small>{item.category}</small>
            </button>
          ))}
        </nav>
        <label className="work-mobile-selector">
          Project
          <select
            value={selection}
            onChange={(event) => select(event.target.value)}
          >
            {workProjects.map((item) => (
              <option key={item.id} value={item.id}>
                {item.shortTitle}
              </option>
            ))}
          </select>
        </label>
        <p className="work-selector-note">
          Each demo explores a decision, a failure or a recovery path.
        </p>
      </div>
      <div
        ref={sectionRef}
        className="work-selected"
        aria-labelledby="selected-project-title"
      >
        <header className="work-selected-header">
          <p className="work-selected-context">{project.context}</p>
          <h2 id="selected-project-title" ref={headingRef} tabIndex={-1}>
            {project.title}
          </h2>
          <p>{project.summary}</p>
        </header>
        <div className="work-demo-frame" ref={frameRef}>
          <div className="work-demo-toolbar">
            <span>
              <span className="work-demo-dot" aria-hidden="true" />
              Interactive reconstruction
            </span>
            <button
              onClick={() => {
                setResetCount((count) => count + 1);
                setAnnouncement("Demo reset.");
              }}
            >
              Reset demo
            </button>
          </div>
          <p className="work-demo-prompt">{project.scenario}</p>
          <DemoAnnouncer.Provider value={announce}>
            <Demo key={`${selection}-${resetCount}`} />
          </DemoAnnouncer.Provider>
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {announcement}
          </p>
          <div className="work-demo-footnote">
            Fictional data. Local interactions only. No work-system connections.
          </div>
        </div>
        <div className="work-case-notes">
          <div>
            <h3>My contribution</h3>
            <p>{project.contribution}</p>
          </div>
          <dl className="work-decision" aria-label="Decision record">
            <div>
              <dt>What could go wrong</dt>
              <dd>{project.risk}</dd>
            </div>
            <div>
              <dt>What I ruled out</dt>
              <dd>{project.ruledOut}</dd>
            </div>
            <div>
              <dt>What I chose</dt>
              <dd>{project.decision}</dd>
            </div>
          </dl>
          {project.outcome && (
            <div className="work-case-outcome">
              <h3>What shipped</h3>
              <p>{project.outcome}</p>
            </div>
          )}
        </div>
        <ul className="work-stack" aria-label="Technologies and skills">
          {project.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
