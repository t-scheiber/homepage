export type DemoId =
  | "equipment"
  | "support"
  | "lifecycle"
  | "scheduler"
  | "access"
  | "connections"
  | "training"
  | "platform";

export interface WorkProject {
  id: DemoId;
  category: string;
  title: string;
  shortTitle: string;
  summary: string;
  contribution: string;
  risk: string;
  ruledOut: string;
  decision: string;
  scenario: string;
  context: string;
  outcome?: string;
  skills: string[];
}

export const workProjects: WorkProject[] = [
  {
    id: "equipment",
    category: "Workflow automation",
    title: "Equipment, without the loose ends.",
    shortTitle: "Equipment handover",
    summary:
      "Equipment requests connect employee details, device choices, shipping and returns. Most of the work is in handling incomplete data and uncertain delivery responses.",
    contribution:
      "I built the onboarding and return workflows: equipment forms, shipping actions, address validation, return tracking and clearer explanations when a request is blocked.",
    risk:
      "A retry after an unclear carrier response could buy a second, billable label for the same shipment.",
    ruledOut:
      "Retrying label creation automatically, or creating a label before the address is complete.",
    decision:
      "A missing address stops the shipment. An uncertain carrier response is reconciled before another label can be bought.",
    scenario:
      "Fix an incomplete address, prepare a sample label, then explore an uncertain carrier response.",
    context: "Refurbed · internal application · 2024–2026, updated Sep 2026",
    outcome:
      "Address checks now run in the employee form and again on the server. Persistent claims stop retries from repeating completed external actions, and an uncertain response is reconciled before another label is bought.",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "API integrations"],
  },
  {
    id: "support",
    category: "AI-assisted support",
    title: "A useful draft still needs a source.",
    shortTitle: "AI support drafts",
    summary:
      "An osTicket extension helps staff draft replies using maintained knowledge and relevant fixes from resolved tickets. Staff remain responsible for the reply.",
    contribution:
      "I worked on the AI reply interface, knowledge editing, learning from resolved tickets, source validation and visibility into skipped or failed extraction.",
    risk:
      "A fix learned from a ticket that later reopens keeps shaping new replies, and a confident draft goes out unchecked.",
    ruledOut:
      "Sending suggested replies automatically, or treating learned fixes as policy.",
    decision:
      "A learned fix is a prior example. If its source changes or reopens, it stops informing new drafts. Staff review and send every reply.",
    scenario:
      "Compare an active source with a reopened one, then review and edit a sample reply.",
    context: "Refurbed · osTicket extension · 2024–2026",
    skills: ["PHP", "osTicket", "LLM integration", "Evidence validation"],
  },
  {
    id: "lifecycle",
    category: "Identity automation",
    title: "Lifecycle changes are rarely all-or-nothing.",
    shortTitle: "Employee lifecycle",
    summary:
      "Employee events coordinate inventory records, equipment workflows and directory or mailbox actions across several systems.",
    contribution:
      "My part covered onboarding and reactivation, equipment-return invitations, keeping preparation work intact and surfacing incomplete directory operations.",
    risk:
      "The request is accepted, the directory step fails, and the run still looks successful.",
    ruledOut:
      "Reporting an accepted request as done, or undoing completed inventory work because one step failed.",
    decision:
      "Each step reports its own result. Completed work is kept, and a partial failure stays visible until someone follows it up.",
    scenario:
      "Run a return-from-leave scenario with a simulated directory failure, then retry it.",
    context: "Refurbed · internal automation · 2024–2026",
    skills: ["Node.js", "Microsoft Graph", "HiBob", "Snipe-IT"],
  },
  {
    id: "scheduler",
    category: "Internal applications",
    title: "The meeting and the room belong together.",
    shortTitle: "Meeting scheduling",
    summary:
      "A scheduling application brings directory lookup, Teams meetings, room availability and recurring invitations into one flow.",
    contribution:
      "I worked on the scheduler and its integrations, plus a reconciliation step that adds new department members to future meetings.",
    risk:
      "A room is free at one time and booked at the time actually chosen. People who join a department later miss its recurring meetings.",
    ruledOut:
      "Checking room availability once, regardless of the selected time.",
    decision:
      "Availability is checked for the chosen time, and a reconciliation step adds new department members to future meetings.",
    scenario:
      "Find a room for a sample meeting. Change the time to expose a booking conflict.",
    context: "Refurbed · internal application · 2024–2026",
    skills: ["Next.js", "TypeScript", "Microsoft Graph", "PostgreSQL"],
  },
  {
    id: "access",
    category: "Identity & access",
    title: "A request is not an access grant.",
    shortTitle: "Guest access",
    summary:
      "Employees can request access to shared resources for an external partner, with an approval step before access is granted.",
    contribution:
      "My part covered resource discovery, folder-path resolution, reliable guest notification links and avoiding duplicate invitations.",
    risk:
      "An employee submits a request and tells the partner they are in before anyone has approved it.",
    ruledOut:
      "A single finished state as soon as the form is submitted.",
    decision:
      "Submitted, approved and rejected stay separate states. Only approval grants access, and each guest is invited once.",
    scenario:
      "Submit a fictional partner request, then compare the approval and rejection paths.",
    context: "Refurbed · internal application · 2024–2026",
    skills: ["Next.js", "Entra ID", "Microsoft Graph", "Power Automate"],
  },
  {
    id: "connections",
    category: "Integration engineering",
    title: "Connect a tool. Keep control of its access.",
    shortTitle: "OAuth connections",
    summary:
      "An OAuth connection hub lets employees connect providers for scripts and automations, manage connections and revoke access.",
    contribution:
      "I worked on encrypted token storage, safe rendering of provider responses, token migration tests and ongoing service maintenance.",
    risk:
      "Someone revokes a connection, and the scripts that depend on it carry on as if nothing changed.",
    ruledOut:
      "Showing tokens or raw provider responses to explain what a connection can do.",
    decision:
      "Connection state is shown without credentials, and revoking a connection stops the work that depends on it.",
    scenario:
      "Connect a fictional workspace, run a sample sync and revoke the connection.",
    context: "Refurbed · internal service · 2024–2026",
    skills: ["OAuth 2.0", "TypeScript", "PostgreSQL", "Token handling"],
  },
  {
    id: "training",
    category: "Training & enablement",
    title: "Learn the workflow by doing it.",
    shortTitle: "Practical Git training",
    summary:
      "A configurable learning platform supports employee training with interactive modules, quizzes and practical Git and deployment exercises.",
    contribution:
      "I created the Git learning path, practical exercises, course videos and voiceovers, visual practice aids, configuration validation and browser tests.",
    risk:
      "A learner clicks through every slide and still can't recover from a real Git mistake.",
    ruledOut:
      "Measuring progress by slides completed.",
    decision:
      "Each exercise teaches the next useful action and explains why a wrong answer is wrong. Browser tests check the learner path.",
    scenario:
      "Work through a short original Git exercise with feedback on each answer.",
    context: "Refurbed · internal learning platform · 2024–2026",
    outcome:
      "Browser tests check the learner path through the exercises, and configuration validation checks each course setup.",
    skills: ["Vue", "TypeScript", "Learning design", "Playwright"],
  },
  {
    id: "platform",
    category: "Developer platforms",
    title: "A deployment path people can inspect.",
    shortTitle: "Git & deployment pilot",
    summary:
      "A Forgejo and Coolify pilot provides a route from version control and review to application deployment on existing hardware. It is not yet in broad use.",
    contribution:
      "I deployed the pilot on existing hardware and set up team access, deployment workflows, automated review, webhook reliability, backups and recovery documentation.",
    risk:
      "Passing checks get mistaken for permission to deploy.",
    ruledOut:
      "Deploying as soon as the checks pass.",
    decision:
      "Checks, an independent review and the deployment are separate, visible gates. The demo shows the gates without reproducing internal infrastructure.",
    scenario:
      "Run failing checks, repair the sample, and approve a demo deployment.",
    context: "Refurbed · internal pilot · 2024–2026, updated Sep 2026",
    outcome:
      "The pilot includes an advisory pull-request reviewer that checks its structured findings against the reviewed diff. SQLite jobs survive restarts and prevent duplicate comments. I tested it with broken and corrected code, cross-file defects and embedded prompt injection, and checked restart recovery and replay.",
    skills: ["Forgejo", "Coolify", "CI/CD", "Docker"],
  },
];

export const furtherProjects = [
  {
    id: "meetings",
    category: "Internal applications",
    title: "Meeting operations",
    description:
      "Schedules, agendas, presentation materials and recordings in one meeting hub.",
    contribution:
      "Recurring invitations, schedule management, recording publication and verification.",
    skills: "React · Microsoft Graph · Scheduled jobs",
  },
  {
    id: "backup",
    category: "Platform tooling",
    title: "Workspace backup & restore",
    description:
      "Incremental workspace backups with version history and a restore-by-URL interface.",
    contribution:
      "Restore tooling, the local recovery UI, backup scheduling and an operations runbook.",
    skills: "Python · Notion API · Recovery tooling",
  },
  {
    id: "inventory",
    category: "Identity & devices",
    title: "Laptop inventory audit",
    description:
      "Reconcile inventory and device-management signals to find stale or mismatched records.",
    contribution:
      "Finding rules, stale-record cleanup proposals and an approval step before messages or changes.",
    skills: "TypeScript · Snipe-IT · Intune · Slack",
  },
  {
    id: "app-deployment",
    category: "Platform tooling",
    title: "Application deployment tooling",
    description:
      "Configuration-driven deployment for Windows applications, macOS packages, setup scripts and remediations.",
    contribution:
      "Verified macOS package uploads, platform-compatible assignments and shared deployment tooling.",
    skills: "Node.js · Intune · PowerShell · GitLab CI",
  },
  {
    id: "group-sync",
    category: "Identity & devices",
    title: "Directory group reconciliation",
    description:
      "Keep a directory group aligned with an approved list in a workspace database.",
    contribution:
      "Dry-run planning, membership validation, limits on removals and read-back verification.",
    skills: "Python · Notion API · Microsoft Graph",
  },
  {
    id: "provisioning",
    category: "Identity & devices",
    title: "Storage account provisioning",
    description:
      "Synchronize approved directory identities with network storage accounts and groups.",
    contribution:
      "Identity synchronization scripts, configuration guidance and credential-handoff integration.",
    skills: "Python · Entra ID · Synology",
  },
  {
    id: "handoff",
    category: "Identity & devices",
    title: "Time-limited credential handoff",
    description:
      "Give one employee temporary access to a credential, with an expiry and cleanup workflow.",
    contribution:
      "Integration for handing storage credentials to the intended employee through the sharing service.",
    skills: "1Password · Service integrations",
  },
  {
    id: "analytics",
    category: "Internal applications",
    title: "AI-tool usage reporting",
    description:
      "Bring usage information from several providers into scheduled reports with clearly different metric types.",
    contribution:
      "Provider connectors, reporting integration and repeatable imports that preserve other tools' history.",
    skills: "Python · Provider APIs · Notion · Cloud Run",
  },
];
