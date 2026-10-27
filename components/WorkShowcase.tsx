"use client";

import { useState, useSyncExternalStore } from "react";
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
  // Section anchors must not discard the currently open demo or its draft.
  if (hashSelection && hashSelection !== selection) setSelection(hashSelection);
  const project = workProjects.find((candidate) => candidate.id === selection)!;
  const Demo = demos[selection];
  function select(id: string) {
    window.history.replaceState(null, "", `#${id}`);
    window.dispatchEvent(new window.Event("hashchange"));
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
              id={item.id}
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
      <div className="work-selected" aria-labelledby="selected-project-title">
        <header className="work-selected-header">
          <h2 id="selected-project-title">{project.title}</h2>
          <p>{project.summary}</p>
        </header>
        <div className="work-demo-frame">
          <div className="work-demo-toolbar">
            <span>
              <span className="work-demo-dot" aria-hidden="true" />
              Interactive reconstruction
            </span>
            <button onClick={() => setResetCount((count) => count + 1)}>
              Reset demo
            </button>
          </div>
          <p className="work-demo-prompt">{project.scenario}</p>
          <Demo key={`${selection}-${resetCount}`} />
          <div className="work-demo-footnote">
            Fictional data. Local interactions only. No work-system connections.
          </div>
        </div>
        <div className="work-case-notes">
          <div>
            <h3>My contribution</h3>
            <p>{project.contribution}</p>
          </div>
          <div>
            <h3>The engineering decision</h3>
            <p>{project.decision}</p>
          </div>
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
